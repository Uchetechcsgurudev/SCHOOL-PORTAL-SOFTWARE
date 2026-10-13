const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { promisify } = require("node:util");
const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const PORT = Number(process.env.SCHOOL_PORT || 3030);
const HOST = process.env.SCHOOL_HOST || "127.0.0.1";
let setupKey = process.env.SCHOOL_SETUP_KEY || "";
const localOnlyHost = ["127.0.0.1", "::1", "localhost"].includes(HOST.toLowerCase());
if (setupKey && Buffer.byteLength(setupKey) < 32) throw new Error("SCHOOL_SETUP_KEY must contain at least 32 bytes.");
const COOKIE_NAME = "northstar_session";
const TOKEN_LIFETIME_SECONDS = 8 * 60 * 60;
const SCRYPT_BYTES = 64;
const scrypt = promisify(crypto.scrypt);
const databaseDirectory = path.resolve(process.env.SCHOOL_DATABASE_DIR || path.resolve(__dirname, "..", ".school-portal-private"));
const databaseRelativePath = path.relative(__dirname, databaseDirectory);
if (databaseRelativePath === "" || (databaseRelativePath !== ".." && !databaseRelativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(databaseRelativePath))) {
  throw new Error("SCHOOL_DATABASE_DIR must be outside the public school website directory.");
}
fs.mkdirSync(databaseDirectory, { recursive: true });
const db = new Database(path.join(databaseDirectory, "northstar-school.sqlite"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS school_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK(role IN ('administrator', 'teacher', 'parent', 'student')),
    student_id TEXT,
    class_name TEXT,
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS school_sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES school_users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS school_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS school_state (
    id INTEGER PRIMARY KEY CHECK(id = 1),
    payload TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS school_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);
const getSetting = db.prepare("SELECT value FROM school_settings WHERE key = ?");
const setSetting = db.prepare("INSERT INTO school_settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
let secret = getSetting.get("jwt_secret")?.value;
if (!secret) {
  secret = crypto.randomBytes(48).toString("base64url");
  setSetting.run("jwt_secret", secret);
}
if (!db.prepare("SELECT id FROM school_state WHERE id = 1").get()) {
  const initialData = JSON.parse(fs.readFileSync(path.join(__dirname, "seed.json"), "utf8"));
  db.prepare("INSERT INTO school_state(id, payload) VALUES(1, ?)").run(JSON.stringify(initialData));
}
if (!setupKey && (process.env.NODE_ENV === "production" || !localOnlyHost) && db.prepare("SELECT COUNT(*) AS count FROM school_users").get().count === 0) {
  throw new Error("Set a one-time SCHOOL_SETUP_KEY before exposing an uninitialized portal or running production first-time setup.");
}

const loginAttempts = new Map();
const loginLimit = 8;
const loginWindow = 15 * 60 * 1000;

app.disable("x-powered-by");
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Cache-Control", "no-store");
  next();
});
app.use(express.json({ limit: "2mb", strict: true }));

function recordAudit(userId, action, details = {}) {
  db.prepare("INSERT INTO school_audit(user_id, action, details) VALUES(?, ?, ?)").run(userId || null, action, JSON.stringify(details));
}
function unauthorized(res, message = "Please sign in to continue.") {
  return res.status(401).json({ error: message });
}
function rejectCrossOrigin(req, res, next) {
  const origin = req.get("origin");
  if (origin && new URL(origin).host !== req.get("host")) return res.status(403).json({ error: "Requests must come from the school website." });
  next();
}
function decodeToken(req) {
  const token = String(req.headers.cookie || "").split(";").map(value => value.trim()).find(value => value.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (receivedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)) return null;
  let claims;
  try { claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")); }
  catch { return null; }
  if (typeof claims.exp !== "number" || claims.exp < Date.now() / 1000 || typeof claims.sub !== "number") return null;
  const sessionHash = crypto.createHash("sha256").update(token).digest("hex");
  if (!db.prepare("SELECT token_hash FROM school_sessions WHERE token_hash = ? AND expires_at > ?").get(sessionHash, Math.floor(Date.now() / 1000))) return null;
  return claims;
}
function requireAuth(req, res, next) {
  const claims = decodeToken(req);
  if (!claims) return unauthorized(res);
  const account = db.prepare("SELECT id, name, email, role, student_id AS studentId, class_name AS className FROM school_users WHERE id = ?").get(claims.sub);
  if (!account) return unauthorized(res);
  req.user = account;
  next();
}
function requireAdmin(req, res, next) {
  if (req.user?.role !== "administrator") return res.status(403).json({ error: "Administrator permission is required for this action." });
  next();
}
function rateLimitLogin(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  let attempts = loginAttempts.get(key);
  if (!attempts || now - attempts.startedAt >= loginWindow) attempts = { count: 0, startedAt: now };
  if (attempts.count >= loginLimit) {
    res.setHeader("Retry-After", String(Math.ceil((loginWindow - (now - attempts.startedAt)) / 1000)));
    loginAttempts.set(key, attempts);
    return res.status(429).json({ error: "Too many sign-in attempts. Please wait 15 minutes and try again." });
  }
  loginAttempts.set(key, attempts);
  req.loginAttemptKey = key;
  next();
}
function recordFailedLogin(req) {
  const key = req.loginAttemptKey;
  if (!key) return;
  const now = Date.now();
  let attempts = loginAttempts.get(key);
  if (!attempts || now - attempts.startedAt >= loginWindow) attempts = { count: 0, startedAt: now };
  attempts.count += 1;
  loginAttempts.set(key, attempts);
}
function createToken(userId) {
  const payload = Buffer.from(JSON.stringify({ sub: userId, exp: Math.floor(Date.now() / 1000) + TOKEN_LIFETIME_SECONDS })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}
function setSessionCookie(req, res, userId) {
  const secure = process.env.NODE_ENV === "production" || req.secure;
  const token = createToken(userId);
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  db.prepare("INSERT INTO school_sessions(token_hash, user_id, expires_at) VALUES(?, ?, ?)").run(tokenHash, userId, Math.floor(Date.now() / 1000) + TOKEN_LIFETIME_SECONDS);
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${TOKEN_LIFETIME_SECONDS}${secure ? "; Secure" : ""}`);
}
function clearSessionCookie(req, res) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${process.env.NODE_ENV === "production" || req.secure ? "; Secure" : ""}`);
}
function safeAccount(account) {
  return { id: account.id, name: account.name, email: account.email, role: account.role, studentId: account.studentId || "", className: account.className || "" };
}
function readFullState() {
  return JSON.parse(db.prepare("SELECT payload FROM school_state WHERE id = 1").get().payload);
}
function scopeState(fullState, user) {
  if (user.role === "administrator") return fullState;
  const state = { ...fullState };
  if (user.role === "teacher") {
    state.students = fullState.students.filter(student => !user.className || student.class === user.className);
    state.results = fullState.results.filter(result => result.teacher === user.name && (!user.className || result.class === user.className));
    state.attendance = fullState.attendance.filter(item => item.teacher === user.name && (!user.className || item.class === user.className));
    state.assessments = fullState.assessments.filter(item => !user.className || item.class === user.className);
    state.timetable = fullState.timetable.filter(item => item.teacher === user.name || !user.className || item.class === user.className);
    state.messages = fullState.messages.filter(message => message.audience === "All teachers" || message.audience === "All families" || message.audience === user.className || message.audience === "School administration" || message.from === user.name);
    state.fees = [];
    state.enquiries = [];
    state.staff = fullState.staff.map(person => ({ id: person.id, name: person.name, role: person.role, subject: person.subject, status: person.status }));
    return state;
  }
  const student = fullState.students.find(item => item.id === user.studentId);
  const studentClass = student?.class || user.className || "";
  state.students = student ? [student] : [];
  state.results = fullState.results.filter(result => result.status === "Approved" && result.class === studentClass)
    .map(result => ({ ...result, scores: (result.scores || []).filter(score => score.studentId === user.studentId) }));
  state.assessments = fullState.assessments.filter(item => item.class === studentClass);
  state.attendance = fullState.attendance.filter(item => item.class === studentClass);
  state.timetable = fullState.timetable.filter(item => item.class === studentClass);
  state.fees = fullState.fees.filter(item => item.studentId === user.studentId);
  state.messages = fullState.messages.filter(message => message.audience === "All families" || message.audience === studentClass || message.audience === user.name || message.from === user.name);
  state.enquiries = [];
  state.staff = [];
  return state;
}
function normalizeAccountInput(body) {
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (name.length < 2) return { error: "Enter a name with at least 2 characters." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 12 || password.length > 200) return { error: "Password must be at least 12 characters." };
  return { name, email, password };
}
function rateLimitPublicEnquiry(req, res, next) {
  const key = `public:${req.ip || req.socket.remoteAddress || "unknown"}`;
  const now = Date.now();
  let attempts = loginAttempts.get(key);
  if (!attempts || now - attempts.startedAt >= loginWindow) attempts = { count: 0, startedAt: now };
  if (attempts.count >= 5) return res.status(429).json({ error: "Too many requests. Please contact the school office by email instead." });
  attempts.count += 1;
  loginAttempts.set(key, attempts);
  next();
}
function equalRows(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}
async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = await scrypt(password, salt, SCRYPT_BYTES, { N: 1 << 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return { salt: salt.toString("base64url"), hash: derived.toString("base64url") };
}
async function verifyPassword(password, account) {
  const expected = Buffer.from(account.password_hash, "base64url");
  const received = await scrypt(password, Buffer.from(account.password_salt, "base64url"), expected.length, { N: 1 << 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "northstar-school-portal" }));
app.get("/api/auth/setup-status", (req, res) => {
  const userCount = db.prepare("SELECT COUNT(*) AS count FROM school_users").get().count;
  res.json({ setupRequired: userCount === 0, setupKeyRequired: userCount === 0 && Boolean(setupKey) });
});
app.post("/api/auth/setup", rejectCrossOrigin, rateLimitLogin, async (req, res, next) => {
  try {
    if (db.prepare("SELECT COUNT(*) AS count FROM school_users").get().count !== 0) return res.status(409).json({ error: "The initial administrator account has already been created. Ask your administrator to create an account for you." });
    if (setupKey) {
      const submittedKey = typeof req.body?.setupKey === "string" ? Buffer.from(req.body.setupKey) : Buffer.alloc(0);
      const expectedKey = Buffer.from(setupKey);
      if (submittedKey.length !== expectedKey.length || !crypto.timingSafeEqual(submittedKey, expectedKey)) return res.status(403).json({ error: "Enter the one-time setup key provided by the school operator." });
    }
    const account = normalizeAccountInput(req.body || {});
    if (account.error) return res.status(400).json({ error: account.error });
    const passwordHash = await hashPassword(account.password);
    const insertAdmin = db.prepare("INSERT INTO school_users(name, email, role, password_salt, password_hash) VALUES(?, ?, 'administrator', ?, ?)");
    const user = db.transaction(() => {
      if (db.prepare("SELECT COUNT(*) AS count FROM school_users").get().count !== 0) {
        throw Object.assign(new Error("The initial administrator account has already been created. Ask your administrator to create an account for you."), { statusCode: 409 });
      }
      const result = insertAdmin.run(account.name, account.email, passwordHash.salt, passwordHash.hash);
      setSetting.run("setup_completed", "true");
      recordAudit(result.lastInsertRowid, "initial_administrator_created", { email: account.email });
      return Number(result.lastInsertRowid);
    })();
    setupKey = "";
    setSessionCookie(req, res, user);
    res.status(201).json({ user: safeAccount({ id: user, ...account, role: "administrator" }) });
  } catch (error) {
    next(error);
  }
});
app.post("/api/auth/login", rejectCrossOrigin, rateLimitLogin, async (req, res, next) => {
  try {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    const account = db.prepare("SELECT id, name, email, role, student_id AS studentId, class_name AS className, password_salt, password_hash FROM school_users WHERE email = ?").get(email);
    const valid = account && password.length <= 200 && await verifyPassword(password, account);
    if (!valid) {
      recordFailedLogin(req);
      return unauthorized(res, "Email or password is incorrect.");
    }
    loginAttempts.delete(req.loginAttemptKey);
    recordAudit(account.id, "login", { email: account.email });
    setSessionCookie(req, res, account.id);
    res.json({ user: safeAccount(account) });
  } catch (error) {
    next(error);
  }
});
app.post("/api/auth/logout", rejectCrossOrigin, (req, res) => {
  const claims = decodeToken(req);
  if (claims) {
    recordAudit(claims.sub, "logout");
    const token = String(req.headers.cookie || "").split(";").map(value => value.trim()).find(value => value.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
    if (token) db.prepare("DELETE FROM school_sessions WHERE token_hash = ?").run(crypto.createHash("sha256").update(token).digest("hex"));
  }
  clearSessionCookie(req, res);
  res.json({ ok: true });
});
app.post("/api/auth/password", rejectCrossOrigin, requireAuth, async (req, res, next) => {
  try {
    const currentPassword = typeof req.body?.currentPassword === "string" ? req.body.currentPassword : "";
    const newPassword = typeof req.body?.newPassword === "string" ? req.body.newPassword : "";
    if (newPassword.length < 12 || newPassword.length > 200) return res.status(400).json({ error: "Your new password must contain at least 12 characters." });
    const account = db.prepare("SELECT id, password_salt, password_hash FROM school_users WHERE id = ?").get(req.user.id);
    if (!account || !(await verifyPassword(currentPassword, account))) return res.status(400).json({ error: "Your current password is incorrect." });
    const nextHash = await hashPassword(newPassword);
    db.transaction(() => {
      db.prepare("UPDATE school_users SET password_salt = ?, password_hash = ? WHERE id = ?").run(nextHash.salt, nextHash.hash, req.user.id);
      db.prepare("DELETE FROM school_sessions WHERE user_id = ?").run(req.user.id);
      recordAudit(req.user.id, "password_changed");
    })();
    setSessionCookie(req, res, req.user.id);
    res.json({ ok: true });
  } catch (error) { next(error); }
});
app.get("/api/auth/me", requireAuth, (req, res) => res.json({ user: safeAccount(req.user) }));
app.get("/api/school/state", requireAuth, (req, res) => res.json({ state: scopeState(readFullState(), req.user) }));
app.put("/api/school/state", rejectCrossOrigin, requireAuth, (req, res, next) => {
  try {
    const submitted = req.body?.state;
    if (!submitted || typeof submitted !== "object" || Array.isArray(submitted)) return res.status(400).json({ error: "Invalid school data." });
    const transaction = db.transaction(() => {
      const previous = readFullState();
      const nextState = structuredClone(previous);
      if (req.user.role !== "administrator") {
        const allowedCollections = req.user.role === "teacher"
          ? new Set(["results", "assessments", "attendance", "messages"])
          : new Set(req.user.role === "parent" || req.user.role === "student" ? ["messages"] : []);
        const visibleState = scopeState(previous, req.user);
        let changedCollection = false;
        for (const collection of allowedCollections) {
          const oldRows = Array.isArray(previous[collection]) ? previous[collection] : [];
          const visibleRows = Array.isArray(visibleState[collection]) ? visibleState[collection] : [];
          const submittedRows = submitted[collection];
          if (!Array.isArray(submittedRows)) throw Object.assign(new Error("Invalid school data."), { statusCode: 400 });
          if (submittedRows.length > 20000 || submittedRows.some(row => !row || typeof row.id !== "string") || new Set(submittedRows.map(row => row.id)).size !== submittedRows.length) throw Object.assign(new Error(`Invalid or duplicate ${collection} records.`), { statusCode: 400 });
          const nextRows = new Map(submittedRows.filter(row => row && typeof row.id === "string").map(row => [row.id, row]));
          const oldById = new Map(visibleRows.filter(row => row && typeof row.id === "string").map(row => [row.id, row]));
          if ([...oldById.keys()].some(id => !nextRows.has(id))) throw Object.assign(new Error("You cannot remove school records."), { statusCode: 403 });
          for (const [id, existing] of oldById) {
            if (JSON.stringify(existing) !== JSON.stringify(nextRows.get(id))) throw Object.assign(new Error("You do not have permission to change this school record."), { statusCode: 403 });
          }
          const additions = [...nextRows.values()].filter(row => !oldById.has(row.id));
          if (additions.length > 25) throw Object.assign(new Error("Submit no more than 25 new records at once."), { statusCode: 400 });
          for (const row of additions) {
            if (collection === "results") {
              const classStudents = new Set(previous.students.filter(student => student.class === req.user.className).map(student => student.id));
              if (req.user.role !== "teacher" || row.status !== "Pending" || row.teacher !== req.user.name || row.class !== req.user.className || !Array.isArray(row.scores) || row.scores.length > 250 || new Set(row.scores.map(score => score.studentId)).size !== row.scores.length || row.scores.some(score => !classStudents.has(score.studentId) || !Number.isFinite(score.score) || score.score < 0 || score.score > 100)) throw Object.assign(new Error("Teachers may submit pending results with unique, valid scores for students from their assigned class only."), { statusCode: 403 });
            }
            if (collection === "attendance") {
              const rosterSize = previous.students.filter(student => student.class === req.user.className).length;
              if (req.user.role !== "teacher" || row.status !== "Submitted" || row.teacher !== req.user.name || row.class !== req.user.className || !Number.isInteger(row.present) || !Number.isInteger(row.absent) || row.present < 0 || row.absent < 0 || row.present + row.absent > rosterSize) throw Object.assign(new Error("Teachers may submit valid attendance counts for their assigned class only."), { statusCode: 403 });
            }
            if (collection === "assessments" && (req.user.role !== "teacher" || row.class !== req.user.className || !["Scheduled", "Open"].includes(row.status))) throw Object.assign(new Error("Teachers may schedule assessments for their assigned class only."), { statusCode: 403 });
            if (collection === "messages") {
              const allowedAudiences = req.user.role === "administrator" ? ["All families", "All teachers", "School administration", ...previous.students.map(student => student.class)] : req.user.role === "teacher" ? ["All families", "School administration", req.user.className] : ["School administration"];
              if (row.status !== "Sent" || row.from !== req.user.name || !allowedAudiences.includes(row.audience)) throw Object.assign(new Error("You can only send messages allowed for your school account."), { statusCode: 403 });
            }
          }
          if (additions.length) {
            nextState[collection] = [...oldRows, ...additions];
            changedCollection = true;
          }
        }
        if (!changedCollection) throw Object.assign(new Error("Your account cannot modify this school record."), { statusCode: 403 });
      } else {
        for (const [collection, oldRows] of Object.entries(previous)) {
          const newRows = submitted[collection];
          if (!Array.isArray(newRows)) throw Object.assign(new Error(`Invalid ${collection} data.`), { statusCode: 400 });
          if (newRows.length > 20000) throw Object.assign(new Error(`The ${collection} list exceeds the school limit.`), { statusCode: 413 });
          if (JSON.stringify(oldRows) !== JSON.stringify(newRows)) {
            nextState[collection] = newRows;
            recordAudit(req.user.id, "school_records_updated", { collection, added: Math.max(0, newRows.length - oldRows.length) });
          }
        }
      }
      db.prepare("UPDATE school_state SET payload = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1").run(JSON.stringify(nextState));
      return scopeState(nextState, req.user);
    });
    res.json({ state: transaction() });
  } catch (error) {
    next(error);
  }
});
app.get("/api/admin/accounts", requireAuth, requireAdmin, (req, res) => {
  const accounts = db.prepare("SELECT id, name, email, role, student_id AS studentId, class_name AS className, created_at AS createdAt FROM school_users ORDER BY id").all();
  res.json({ accounts });
});
app.post("/api/admin/accounts", rejectCrossOrigin, requireAuth, requireAdmin, async (req, res, next) => {
  try {
      const account = normalizeAccountInput(req.body || {});
    if (account.error) return res.status(400).json({ error: account.error });
    const role = req.body.role;
    if (!["teacher", "parent", "student"].includes(role)) return res.status(400).json({ error: "Administrator accounts can only be created through the initial secure setup." });
    const className = typeof req.body.className === "string" && req.body.className.trim().length <= 80 ? req.body.className.trim() : "";
    const studentId = typeof req.body.studentId === "string" ? req.body.studentId.trim() : "";
    if (role === "teacher" && !className) return res.status(400).json({ error: "Assign the teacher to a class." });
    if (["parent", "student"].includes(role) && !studentId) return res.status(400).json({ error: "Link this account to a student record." });
    const schoolState = readFullState();
    const student = role === "teacher" ? null : schoolState.students.find(row => row.id === studentId);
    if (role !== "teacher" && !student) return res.status(400).json({ error: "Select a valid student record for this account." });
    const passwordHash = await hashPassword(account.password);
    const created = db.transaction(() => {
      const result = db.prepare("INSERT INTO school_users(name, email, role, student_id, class_name, password_salt, password_hash) VALUES(?, ?, ?, ?, ?, ?, ?)")
        .run(account.name, account.email, role, studentId || null, className || student?.class || null, passwordHash.salt, passwordHash.hash);
      if (role === "teacher") {
        const state = readFullState();
        state.staff.unshift({ id: `ST-${Number(result.lastInsertRowid) + 200}`, userId: Number(result.lastInsertRowid), name: account.name, role: "Teacher", subject: className, email: account.email, phone: "", className, status: "Active" });
        db.prepare("UPDATE school_state SET payload = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1").run(JSON.stringify(state));
      }
      recordAudit(req.user.id, "account_created", { role, email: account.email, studentId: studentId || null });
      return Number(result.lastInsertRowid);
    })();
    res.status(201).json({ account: { id: created, name: account.name, email: account.email, role, studentId: studentId || "", className: className || student?.class || "" } });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({ error: "An account with that email address already exists." });
    next(error);
  }
});
app.post("/api/admin/accounts/:id/password", rejectCrossOrigin, requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({ error: "Invalid account." });
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (password.length < 12 || password.length > 200) return res.status(400).json({ error: "Set a temporary password of at least 12 characters." });
    const account = db.prepare("SELECT id, role, email FROM school_users WHERE id = ?").get(id);
    if (!account) return res.status(404).json({ error: "Account not found." });
    const passwordHash = await hashPassword(password);
    db.transaction(() => {
      db.prepare("UPDATE school_users SET password_salt = ?, password_hash = ? WHERE id = ?").run(passwordHash.salt, passwordHash.hash, id);
      db.prepare("DELETE FROM school_sessions WHERE user_id = ?").run(id);
      recordAudit(req.user.id, "account_password_reset", { accountId: id, email: account.email });
    })();
    res.json({ ok: true });
  } catch (error) { next(error); }
});
app.delete("/api/admin/accounts/:id", rejectCrossOrigin, requireAuth, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({ error: "Invalid account." });
  const account = db.prepare("SELECT id, role FROM school_users WHERE id = ?").get(id);
  if (!account) return res.status(404).json({ error: "Account not found." });
  if (account.role === "administrator") return res.status(403).json({ error: "Administrator accounts cannot be deleted from the portal." });
  db.transaction(() => {
    db.prepare("DELETE FROM school_users WHERE id = ?").run(id);
    const state = readFullState();
    if (account.role === "teacher") state.staff = state.staff.filter(member => member.userId !== id);
    db.prepare("UPDATE school_state SET payload = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1").run(JSON.stringify(state));
    recordAudit(req.user.id, "account_removed", { id, role: account.role });
  })();
  res.json({ ok: true });
});
app.get("/api/admin/audit", requireAuth, requireAdmin, (req, res) => {
  const events = db.prepare(`
    SELECT school_audit.action, school_audit.details, school_audit.created_at AS createdAt, school_users.name AS actor
    FROM school_audit LEFT JOIN school_users ON school_users.id = school_audit.user_id
    ORDER BY school_audit.id DESC LIMIT 100
  `).all().map(event => ({ ...event, details: JSON.parse(event.details) }));
  res.json({ events });
});
app.post("/api/public/enquiries", rejectCrossOrigin, rateLimitPublicEnquiry, (req, res) => {
  const body = req.body || {};
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const student = typeof body.student === "string" ? body.student.trim().slice(0, 100) : "";
  const guardian = typeof body.guardian === "string" ? body.guardian.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  const type = body.type === "School visit" ? "School visit" : "Website enquiry";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
  if (type === "School visit" && (!student || !guardian)) return res.status(400).json({ error: "Add the student and parent or guardian names." });
  const state = readFullState();
  const request = { id: `ENQ-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`, name, student, guardian, email, phone: typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "", class: typeof body.class === "string" ? body.class.trim().slice(0, 80) : typeof body.interest === "string" ? body.interest.trim().slice(0, 80) : "", message, date: new Date().toISOString().slice(0, 10), type, status: "New" };
  state.enquiries.unshift(request);
  db.prepare("UPDATE school_state SET payload = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1").run(JSON.stringify(state));
  res.status(201).json({ ok: true, message: "Thank you. The school office has received your message." });
});
app.use("/api", (req, res) => res.status(404).json({ error: "School portal endpoint not found." }));
app.use(express.static(__dirname, { dotfiles: "deny", etag: true, maxAge: "10m", index: false }));
app.get(["/", "/portal"], (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error("School portal request failed:", error);
  const status = Number.isInteger(error.statusCode) ? error.statusCode : error.type === "entity.too.large" ? 413 : error instanceof SyntaxError ? 400 : 500;
  res.status(status).json({ error: status === 500 ? "The school portal could not complete this request. Please try again." : error.message });
});
app.listen(PORT, HOST, () => {
  console.log(`Northstar School Portal is running at http://${HOST}:${PORT}`);
  console.log(`Private school records are stored outside the public website at ${databaseDirectory}.`);
});
