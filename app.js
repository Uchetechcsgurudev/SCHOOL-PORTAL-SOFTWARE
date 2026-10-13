const initialData = {
  students: [
    { id: "NS-2401", name: "Aaliyah Johnson", class: "Grade 9A", guardian: "Tomi Johnson", phone: "+234 803 555 0191", email: "tomi.johnson@example.com", status: "Active" },
    { id: "NS-2402", name: "Daniel Okonkwo", class: "Grade 10B", guardian: "Chika Okonkwo", phone: "+234 806 401 2258", email: "chika.okonkwo@example.com", status: "Active" },
    { id: "NS-2403", name: "Maya Adeyemi", class: "Grade 11A", guardian: "Bola Adeyemi", phone: "+234 809 211 7034", email: "bola.adeyemi@example.com", status: "Active" },
    { id: "NS-2404", name: "Noah Williams", class: "Grade 9A", guardian: "Grace Williams", phone: "+234 802 443 8910", email: "grace.williams@example.com", status: "Active" },
    { id: "NS-2405", name: "Zara Ibrahim", class: "Grade 12A", guardian: "Sani Ibrahim", phone: "+234 805 919 4472", email: "sani.ibrahim@example.com", status: "Active" },
    { id: "NS-2406", name: "Emeka Nwosu", class: "Grade 10A", guardian: "Ifeoma Nwosu", phone: "+234 814 232 1009", email: "ifeoma.nwosu@example.com", status: "Active" }
  ],
  results: [
    { id: "R-1024", class: "Grade 9A", subject: "Mathematics", teacher: "Kemi Adebayo", date: "2026-10-12", status: "Approved", term: "First term", scores: [{ studentId: "NS-2401", studentName: "Aaliyah Johnson", score: 86 }, { studentId: "NS-2404", studentName: "Noah Williams", score: 91 }] },
    { id: "R-1023", class: "Grade 11B", subject: "Biology", teacher: "David Mensah", date: "2026-10-12", status: "Pending", term: "First term", scores: [] },
    { id: "R-1022", class: "Grade 10A", subject: "English Language", teacher: "Fatima Bello", date: "2026-10-11", status: "Pending", term: "First term", scores: [] },
    { id: "R-1021", class: "Grade 12A", subject: "Physics", teacher: "Chidi Eze", date: "2026-10-10", status: "Approved", term: "First term", scores: [] }
  ],
  assessments: [
    { id: "AS-310", title: "Mid-term Mathematics", class: "Grade 9A", subject: "Mathematics", date: "2026-10-19", type: "Examination", status: "Scheduled" },
    { id: "AS-309", title: "Cell Biology Quiz", class: "Grade 11B", subject: "Biology", date: "2026-10-20", type: "Quiz", status: "Scheduled" },
    { id: "AS-308", title: "Essay: My Community", class: "Grade 10A", subject: "English Language", date: "2026-10-15", type: "Assignment", status: "Open" },
    { id: "AS-307", title: "Forces and Motion", class: "Grade 12A", subject: "Physics", date: "2026-10-08", type: "Test", status: "Completed" }
  ],
  attendance: [
    { id: "AT-1201", date: "2026-10-12", class: "Grade 9A", present: 28, absent: 2, teacher: "Kemi Adebayo", status: "Submitted" },
    { id: "AT-1202", date: "2026-10-12", class: "Grade 10A", present: 25, absent: 1, teacher: "Fatima Bello", status: "Submitted" },
    { id: "AT-1203", date: "2026-10-12", class: "Grade 11B", present: 21, absent: 3, teacher: "David Mensah", status: "Submitted" },
    { id: "AT-1204", date: "2026-10-12", class: "Grade 12A", present: 24, absent: 0, teacher: "Chidi Eze", status: "Submitted" }
  ],
  timetable: [
    { id: "TT-101", day: "Monday", time: "09:00", class: "Grade 9A", subject: "Mathematics", teacher: "Kemi Adebayo", room: "Room 204" },
    { id: "TT-102", day: "Monday", time: "10:30", class: "Grade 11B", subject: "Biology", teacher: "David Mensah", room: "Lab 2" },
    { id: "TT-103", day: "Tuesday", time: "09:00", class: "Grade 10A", subject: "English Language", teacher: "Fatima Bello", room: "Room 103" },
    { id: "TT-104", day: "Wednesday", time: "11:00", class: "Grade 12A", subject: "Physics", teacher: "Chidi Eze", room: "Lab 1" },
    { id: "TT-105", day: "Thursday", time: "12:00", class: "Grade 9A", subject: "Creative Arts", teacher: "Amara Okafor", room: "Studio 1" }
  ],
  fees: [
    { id: "INV-8801", student: "Aaliyah Johnson", studentId: "NS-2401", class: "Grade 9A", description: "First term tuition", amount: 185000, due: "2026-10-15", status: "Paid" },
    { id: "INV-8802", student: "Daniel Okonkwo", studentId: "NS-2402", class: "Grade 10B", description: "First term tuition", amount: 210000, due: "2026-10-15", status: "Pending" },
    { id: "INV-8803", student: "Maya Adeyemi", studentId: "NS-2403", class: "Grade 11A", description: "First term tuition", amount: 225000, due: "2026-10-15", status: "Overdue" },
    { id: "INV-8804", student: "Noah Williams", studentId: "NS-2404", class: "Grade 9A", description: "Lab materials", amount: 25000, due: "2026-10-20", status: "Pending" }
  ],
  messages: [
    { id: "MSG-501", from: "Mrs. Johnson", audience: "School administration", subject: "Question about the term calendar", date: "2026-10-12", body: "Hello, could you please share the updated term calendar? Thank you.", status: "Unread" },
    { id: "MSG-500", from: "Mr. Okonkwo", audience: "Grade 10B teacher", subject: "Daniel's recent attendance", date: "2026-10-11", body: "I wanted to check in about Daniel's recent attendance. Please let me know when would be a good time to talk.", status: "Unread" },
    { id: "MSG-499", from: "Admissions office", audience: "School administration", subject: "New student applications", date: "2026-10-11", body: "There are three new applications ready for review.", status: "Unread" },
    { id: "MSG-498", from: "Mrs. Adeyemi", audience: "Grade 11A teacher", subject: "Science fair permission form", date: "2026-10-10", body: "Please send home another copy of the science fair permission form.", status: "Read" }
  ],
  enquiries: [],
  staff: [
    { id: "ST-201", name: "Kemi Adebayo", role: "Mathematics teacher", subject: "Mathematics", email: "kemi.adebayo@northstaracademy.edu", phone: "+234 803 555 0101", status: "Active" },
    { id: "ST-202", name: "David Mensah", role: "Science teacher", subject: "Biology", email: "david.mensah@northstaracademy.edu", phone: "+234 803 555 0102", status: "Active" },
    { id: "ST-203", name: "Fatima Bello", role: "English teacher", subject: "English Language", email: "fatima.bello@northstaracademy.edu", phone: "+234 803 555 0103", status: "Active" },
    { id: "ST-204", name: "Chidi Eze", role: "Physics teacher", subject: "Physics", email: "chidi.eze@northstaracademy.edu", phone: "+234 803 555 0104", status: "Active" }
  ]
};

const classes = ["Grade 9A", "Grade 10A", "Grade 10B", "Grade 11A", "Grade 11B", "Grade 12A"];
const moduleSettings = {
  Accounts: { key: "accounts", title: "Portal user accounts", description: "Create teacher, student and family logins. Each account receives only the access it needs.", action: "Create account", columns: ["Name", "Email", "Portal role", "Linked class or student", "Created", "Access"], fields: [{ name: "name", label: "Account holder's name", required: true }, { name: "email", label: "Email address", type: "email", required: true }, { name: "password", label: "Temporary password · at least 12 characters", type: "password", required: true }, { name: "role", label: "Portal role", kind: "select", options: ["Teacher", "Parent", "Student"] }, { name: "className", label: "Assigned class (teachers only)", kind: "select", options: classes }, { name: "studentId", label: "Link to student (families only)", kind: "student" }] },
  Admissions: { key: "enquiries", title: "Admissions & enquiries", description: "Follow up website questions, school visits and new student applications.", action: "Add applicant", columns: ["Applicant", "Parent / guardian", "Class", "Enquiry", "Received", "Status"], fields: [{ name: "student", label: "Student name", required: true }, { name: "guardian", label: "Parent / guardian", required: true }, { name: "email", label: "Family email", type: "email", required: true }, { name: "phone", label: "Contact number" }, { name: "class", label: "Class of interest", kind: "select", options: classes }, { name: "message", label: "Notes", kind: "textarea", full: true }] },
  Staff: { key: "staff", title: "Staff directory", description: "Keep teacher and school staff contacts up to date.", action: "Add staff member", columns: ["Staff member", "Staff ID", "Role", "Subject", "Email", "Contact", "Status"], fields: [{ name: "name", label: "Staff member's name", required: true }, { name: "role", label: "Role / title", required: true }, { name: "subject", label: "Subject / department", required: true }, { name: "email", label: "Work email", type: "email", required: true }, { name: "phone", label: "Contact number", required: true }] },
  Students: { key: "students", title: "Student directory", description: "Keep student and family information organized in one place.", action: "Add student", columns: ["Student", "Student ID", "Class", "Parent / guardian", "Contact", "Status"], fields: [{ name: "name", label: "Student name", required: true }, { name: "class", label: "Class", kind: "select", options: classes }, { name: "guardian", label: "Parent / guardian", required: true }, { name: "phone", label: "Contact number", required: true }, { name: "email", label: "Guardian email", type: "email" }] },
  Results: { key: "results", title: "Results & reports", description: "Upload marks, review results and publish reports to each student's portal.", action: "Upload results", columns: ["Result ID", "Class", "Subject", "Teacher", "Submitted", "Students", "Status"], fields: [{ name: "class", label: "Class", kind: "select", options: classes }, { name: "subject", label: "Subject", required: true }, { name: "teacher", label: "Teacher's name", required: true }, { name: "file", label: "Scores CSV", kind: "file", required: true, full: true }, { name: "note", label: "Teacher's note (optional)", kind: "textarea", full: true }] },
  Assessments: { key: "assessments", title: "Assessments & exams", description: "Plan tests, examinations, quizzes and assignments across every class.", action: "Create assessment", columns: ["Assessment", "Class", "Subject", "Date", "Type", "Status"], fields: [{ name: "title", label: "Assessment name", required: true }, { name: "class", label: "Class", kind: "select", options: classes }, { name: "subject", label: "Subject", required: true }, { name: "date", label: "Assessment date", type: "date", required: true }, { name: "type", label: "Assessment type", kind: "select", options: ["Examination", "Quiz", "Assignment", "Test"] }, { name: "instructions", label: "Instructions for students", kind: "textarea", full: true }] },
  Attendance: { key: "attendance", title: "Class attendance", description: "Record who is in class and keep daily attendance together.", action: "Record attendance", columns: ["Date", "Class", "Present", "Absent", "Teacher", "Status"], fields: [{ name: "date", label: "Date", type: "date", required: true }, { name: "class", label: "Class", kind: "select", options: classes }, { name: "present", label: "Students present", type: "number", required: true }, { name: "absent", label: "Students absent", type: "number", required: true }, { name: "teacher", label: "Recorded by", required: true }] },
  Timetable: { key: "timetable", title: "School timetable", description: "Coordinate classes, teaching staff and learning spaces.", action: "Add a lesson", columns: ["Day", "Time", "Class", "Subject", "Teacher", "Room"], fields: [{ name: "day", label: "Day", kind: "select", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] }, { name: "time", label: "Start time", type: "time", required: true }, { name: "class", label: "Class", kind: "select", options: classes }, { name: "subject", label: "Subject", required: true }, { name: "teacher", label: "Teacher", required: true }, { name: "room", label: "Room", required: true }] },
  Fees: { key: "fees", title: "Fees & payments", description: "Keep track of family invoices, school fees and payments.", action: "Create invoice", columns: ["Invoice", "Student", "Class", "Description", "Amount", "Due date", "Status"], fields: [{ name: "studentId", label: "Student", kind: "student", required: true }, { name: "description", label: "Fee description", required: true }, { name: "amount", label: "Amount (₦)", type: "number", required: true }, { name: "due", label: "Due date", type: "date", required: true }] },
  Messages: { key: "messages", title: "School messages", description: "Read and send messages between the school and its families.", action: "Compose message", columns: ["From", "To", "Subject", "Date", "Status"], fields: [{ name: "audience", label: "Send to", kind: "select", options: ["All families", "All teachers", "School administration", ...classes] }, { name: "subject", label: "Subject", required: true, full: true }, { name: "body", label: "Message", kind: "textarea", required: true, full: true }] }
};

const todayIso = "2026-10-12";
const roleLabels = { Administrator: "Amara Okafor", Teacher: "Kemi Adebayo", Student: "Aaliyah Johnson", Parent: "Tomi Johnson" };
let portalData = clone(initialData);
let portalAccounts = [];
let currentModule = "Dashboard";
let currentRole = "Administrator";
let currentUser = null;
let activeStudentId = "NS-2401";
let toastTimer;
let modalCloseTimer;

function clone(value) { return JSON.parse(JSON.stringify(value)); }
async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || "GET",
    credentials: "same-origin",
    headers: options.body === undefined ? {} : { "Content-Type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body)
  });
  let result;
  try { result = await response.json(); }
  catch { throw new Error(`The school server returned an unexpected response (${response.status}).`); }
  if (!response.ok) throw new Error(result.error || `The request failed (${response.status}).`);
  return result;
}
async function saveData() {
  try {
    const result = await apiRequest("/api/school/state", { method: "PUT", body: { state: portalData } });
    portalData = result.state;
    return true;
  } catch (error) {
    if (error.message === "Please sign in to continue.") {
      currentUser = null;
      history.replaceState({}, "", "/");
      showHomepage();
      showToast("Your sign-in has expired. Please sign in again.");
    } else showToast(error.message || "This change could not be saved.");
    try { portalData = (await apiRequest("/api/school/state")).state; }
    catch (refreshError) { console.error("Could not refresh school records after a failed update.", refreshError); }
    return false;
  }
}
function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function initials(name) { return String(name || "?").trim().split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase(); }
function dateDisplay(value) {
  if (!value) return "—";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}
function newId(prefix, rows) {
  const next = rows.reduce((max, row) => Math.max(max, Number(String(row.id || "").match(/\d+$/)?.[0]) || 0), 0) + 1;
  return `${prefix}-${next}`;
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2900);
}
function launchPortal(user, state) {
  currentUser = user;
  currentRole = ({ administrator: "Administrator", teacher: "Teacher", student: "Student", parent: "Parent" })[user.role] || "Student";
  roleLabels[currentRole] = user.name;
  activeStudentId = user.studentId || state.students[0]?.id || "";
  portalData = state;
  document.getElementById("portalAuthScreen").classList.add("hidden");
  document.getElementById("publicSite").classList.add("hidden");
  document.getElementById("portalShell").classList.remove("hidden");
  document.body.classList.add("portal-open");
  document.getElementById("accountAvatar").textContent = initials(user.name);
  document.getElementById("accountName").textContent = user.name;
  document.getElementById("accountRole").textContent = `${currentRole}${user.className ? ` · ${user.className}` : ""}`;
  document.getElementById("portalUserAvatar").textContent = initials(user.name);
  document.getElementById("portalSchoolName").textContent = "Northstar Academy";
  document.getElementById("portalSchoolYear").textContent = "Academic year 2026/27";
  goToModule("Dashboard");
  window.scrollTo(0, 0);
}
async function showHomepage() {
  document.getElementById("portalShell").classList.add("hidden");
  document.getElementById("portalAuthScreen").classList.add("hidden");
  document.getElementById("publicSite").classList.remove("hidden");
  document.body.classList.remove("portal-open");
  document.getElementById("portalSidebar").classList.remove("open");
  document.getElementById("modalBackdrop").classList.add("hidden");
  currentUser = null;
  currentModule = "Dashboard";
  if (window.location.pathname !== "/") history.replaceState({}, "", "/");
  window.scrollTo(0, 0);
}
async function leavePortal() {
  try { await apiRequest("/api/auth/logout", { method: "POST", body: {} }); }
  catch (error) { console.error("Could not end the school portal session cleanly.", error); }
  await showHomepage();
  showToast("You have signed out of the school portal.");
}
function visibleModules() {
  if (currentRole === "Administrator") return ["Dashboard", "Decisions", "Admissions", "Students", "Staff", "Accounts", "Results", "Assessments", "Attendance", "Timetable", "Fees", "Messages"];
  if (currentRole === "Teacher") return ["Dashboard", "Students", "Staff", "Results", "Assessments", "Attendance", "Timetable", "Messages"];
  return ["Dashboard", "Results", "Assessments", "Attendance", "Timetable", "Fees", "Messages"];
}
function goToModule(name) {
  if (name !== "Dashboard" && name !== "Decisions" && !moduleSettings[name]) return;
  if (!visibleModules().includes(name)) { showToast("You do not have permission to view this section."); return; }
  currentModule = name;
  document.querySelectorAll(".portal-nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.module === name);
    button.classList.toggle("hidden", !visibleModules().includes(button.dataset.module));
  });
  document.getElementById("portalCrumb").textContent = name === "Dashboard" ? "Overview" : name === "Decisions" ? "Decision centre" : moduleSettings[name].title;
  document.getElementById("portalSidebar").classList.remove("open");
  if (name === "Dashboard") renderDashboard();
  else if (name === "Decisions") renderDecisionCentre();
  else if (name === "Accounts") renderAccounts();
  else renderModule(name);
}

function openModal(title, body, onSave) {
  clearTimeout(modalCloseTimer);
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  const backdrop = document.getElementById("modalBackdrop");
  backdrop.classList.remove("hidden", "is-closing");
  const first = document.querySelector("#modalBody input, #modalBody select");
  first?.focus();
  document.getElementById("modalBody").querySelector("[data-cancel]")?.addEventListener("click", closeModal);
  const form = document.getElementById("modalBody").querySelector("form");
  if (form) form.addEventListener("submit", async event => {
    event.preventDefault();
    const submit = form.querySelector('[type="submit"]');
    if (submit?.disabled) return;
    if (submit) submit.disabled = true;
    try { await onSave(new FormData(form), form); }
    finally { if (submit?.isConnected) submit.disabled = false; }
  });
  else document.getElementById("modalBody").querySelector("[data-save]")?.addEventListener("click", onSave);
}
function closeModal() {
  const backdrop = document.getElementById("modalBackdrop");
  if (backdrop.classList.contains("hidden")) return;
  backdrop.classList.add("is-closing");
  modalCloseTimer = setTimeout(() => backdrop.classList.add("hidden"), 170);
}
function setAuthFeedback(id, message) {
  const feedback = document.getElementById(id);
  if (feedback) feedback.textContent = message;
}
function showAuthForm(showSetup) {
  document.getElementById("portalLoginForm").classList.toggle("hidden", showSetup);
  document.getElementById("firstAdminForm").classList.toggle("hidden", !showSetup);
  document.getElementById("firstAdminPrompt").classList.add("hidden");
  document.getElementById("authTitle").textContent = showSetup ? "Make it official." : "Welcome back.";
  document.getElementById("authSubtitle").textContent = showSetup ? "Create the private school account that will manage your portal." : "Sign in with the email and password provided by your school.";
  setAuthFeedback("loginFeedback", "");
  setAuthFeedback("setupFeedback", "");
}
async function showPortalAuth() {
  document.getElementById("publicSite").classList.add("hidden");
  document.getElementById("portalShell").classList.add("hidden");
  document.getElementById("portalAuthScreen").classList.remove("hidden");
  document.body.classList.remove("portal-open");
  try {
    const { user } = await apiRequest("/api/auth/me");
    const { state } = await apiRequest("/api/school/state");
    launchPortal(user, state);
    return;
  } catch (error) {
    if (error.message !== "Please sign in to continue.") {
      setAuthFeedback("loginFeedback", `School server unavailable: ${error.message} Start the server with node school-portal\\server.js.`);
    }
  }
  try {
    const { setupRequired, setupKeyRequired } = await apiRequest("/api/auth/setup-status");
    document.getElementById("firstAdminPrompt").classList.toggle("hidden", !setupRequired);
    const setupKeyField = document.getElementById("setupKeyField");
    setupKeyField.classList.toggle("hidden", !setupKeyRequired);
    setupKeyField.querySelector("input").required = Boolean(setupKeyRequired);
    showAuthForm(false);
    document.getElementById("firstAdminPrompt").classList.toggle("hidden", !setupRequired);
  } catch (error) {
    setAuthFeedback("loginFeedback", `Unable to connect to the school server. Start it with node school-portal\\server.js. ${error.message}`);
  }
}
function openSignIn(event) {
  if (event) event.preventDefault();
  if (window.location.protocol === "file:") {
    window.location.assign("http://127.0.0.1:3030/portal");
    return;
  }
  history.pushState({}, "", "/portal");
  showPortalAuth();
}
function setupPortalAuth() {
  document.getElementById("startAdminSetup").addEventListener("click", () => showAuthForm(true));
  document.getElementById("backToLogin").addEventListener("click", () => showAuthForm(false));
  document.getElementById("portalLoginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    setAuthFeedback("loginFeedback", "Securely checking your sign-in…");
    try {
      const body = Object.fromEntries(new FormData(form));
      const { user } = await apiRequest("/api/auth/login", { method: "POST", body });
      const { state } = await apiRequest("/api/school/state");
      form.reset();
      history.replaceState({}, "", "/portal");
      launchPortal(user, state);
      showToast(`Welcome back, ${user.name}.`);
    } catch (error) { setAuthFeedback("loginFeedback", error.message); }
    finally { submit.disabled = false; }
  });
  document.getElementById("firstAdminForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    setAuthFeedback("setupFeedback", "Creating the school’s secure administrator account…");
    try {
      const body = Object.fromEntries(new FormData(form));
      const { user } = await apiRequest("/api/auth/setup", { method: "POST", body });
      const { state } = await apiRequest("/api/school/state");
      form.reset();
      history.replaceState({}, "", "/portal");
      launchPortal(user, state);
      showToast("Your administrator account is ready.");
    } catch (error) { setAuthFeedback("setupFeedback", error.message); }
    finally { submit.disabled = false; }
  });
  document.getElementById("portalAuthScreen").addEventListener("click", event => {
    const toggle = event.target.closest(".password-toggle");
    if (!toggle) return;
    const input = toggle.closest(".password-field").querySelector("input");
    const reveal = input.type === "password";
    input.type = reveal ? "text" : "password";
    toggle.textContent = reveal ? "Hide" : "Show";
    toggle.setAttribute("aria-label", `${reveal ? "Hide" : "Show"} password`);
  });
}
function openPasswordChange() {
  const body = `<form id="passwordChangeForm"><label class="portal-form-field"><span>Current password</span><input name="currentPassword" type="password" autocomplete="current-password" required></label><label class="portal-form-field"><span>New password · at least 12 characters</span><input name="newPassword" type="password" autocomplete="new-password" minlength="12" maxlength="200" required></label><div class="portal-modal-actions"><button class="portal-btn portal-btn-secondary" data-cancel type="button">Cancel</button><button class="portal-btn" type="submit">Update password</button></div></form>`;
  openModal("Change your password", body, async (formData, form) => {
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    try {
      await apiRequest("/api/auth/password", { method: "POST", body: Object.fromEntries(formData) });
      closeModal();
      showToast("Your password has been changed.");
    } catch (error) { showToast(error.message); }
    finally { submit.disabled = false; }
  });
}
function dateFieldValue(field, row) {
  let options = field.options || [];
  if (field.kind === "select" && currentRole === "Teacher" && ["class", "className"].includes(field.name) && currentUser?.className) options = [currentUser.className];
  if (field.name === "audience" && currentRole === "Teacher") options = ["School administration", "All families", currentUser.className].filter(Boolean);
  if (field.name === "audience" && ["Parent", "Student"].includes(currentRole)) options = ["School administration"];
  return field.kind === "student"
    ? `<select name="studentId" ${field.required ? "required" : ""}><option value="" disabled selected>Select a student</option>${portalData.students.map(student => `<option value="${escapeHtml(student.id)}">${escapeHtml(student.name)} · ${escapeHtml(student.id)}</option>`).join("")}</select>`
    : field.kind === "select"
      ? `<select name="${escapeHtml(field.name)}" ${field.required ? "required" : ""}>${options.map(option => `<option ${row && row[field.name] === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>`
      : field.kind === "textarea"
        ? `<textarea name="${escapeHtml(field.name)}" ${field.required ? "required" : ""}></textarea>`
        : field.kind === "file"
          ? `<input name="${escapeHtml(field.name)}" type="file" accept=".csv,text/csv" ${field.required ? "required" : ""}>`
          : `<input name="${escapeHtml(field.name)}" type="${escapeHtml(field.type || "text")}" ${field.type === "number" ? 'min="0"' : ""} ${field.required ? "required" : ""} ${row?.[field.name] !== undefined ? `value="${escapeHtml(row[field.name])}"` : ""}>`;
}
function openCreateForm(moduleName) {
  const config = moduleSettings[moduleName];
  if (["Admissions", "Students", "Staff"].includes(moduleName) && currentRole !== "Administrator") return showToast("This section is managed by the school administrator.");
  if (moduleName === "Accounts" && currentRole !== "Administrator") return showToast("Only the school administrator can create portal accounts.");
  if (moduleName === "Fees" && currentRole !== "Administrator") return showToast("Invoices can only be added by an administrator.");
  if (moduleName === "Results" && !["Administrator", "Teacher"].includes(currentRole)) return showToast("Only school staff can upload class results.");
  const body = `<form id="portalEntryForm"><div class="portal-form-grid">${config.fields.map(field => `<label class="portal-form-field ${field.full ? "full" : ""}"><span>${escapeHtml(field.label)}</span>${dateFieldValue(field)}</label>`).join("")}</div><div class="portal-modal-actions"><button class="portal-btn portal-btn-secondary" data-cancel type="button">Cancel</button><button class="portal-btn" type="submit">${moduleName === "Results" ? "Upload for review" : moduleName === "Messages" ? "Send message" : "Save record"}</button></div></form>`;
  openModal(config.action, body, formData => submitEntry(moduleName, formData));
  if (moduleName === "Accounts") {
    const form = document.getElementById("portalEntryForm");
    const updateAccountFields = () => {
      const role = form.querySelector('[name="role"]').value.toLowerCase();
      const classInput = form.querySelector('[name="className"]');
      const studentInput = form.querySelector('[name="studentId"]');
      const classField = classInput.closest(".portal-form-field");
      const studentField = studentInput.closest(".portal-form-field");
      classField.classList.toggle("hidden", role !== "teacher");
      studentField.classList.toggle("hidden", role === "teacher");
      classInput.required = role === "teacher";
      studentInput.required = role !== "teacher";
    };
    form.querySelector('[name="role"]').addEventListener("change", updateAccountFields);
    updateAccountFields();
  }
}
async function submitEntry(moduleName, formData) {
  const settings = moduleSettings[moduleName];
  const row = {};
  for (const field of settings.fields) if (field.kind !== "file" && field.name !== "studentId") row[field.name] = String(formData.get(field.name) || "").trim();
  if (moduleName === "Accounts") {
    try {
      const account = Object.fromEntries(formData);
      account.role = String(account.role).toLowerCase();
      account.studentId = account.role === "teacher" ? "" : String(account.studentId || "");
      account.className = account.role === "teacher" ? String(account.className || "") : "";
      await apiRequest("/api/admin/accounts", { method: "POST", body: account });
      const { state } = await apiRequest("/api/school/state");
      portalData = state;
      closeModal();
      renderAccounts();
      showToast(`The ${account.role} account is ready to use.`);
    } catch (error) { showToast(error.message); }
    return;
  }
  if (moduleName === "Results") {
    const file = formData.get("file");
    if (!(file instanceof File) || !file.name.toLowerCase().endsWith(".csv")) return showToast("Choose a CSV file containing student marks.");
    try {
      const parsed = parseCsvScores(await file.text());
      if (!parsed.length) return showToast("Add a heading row and at least one student score.");
      row.scores = parsed.map(score => {
        const student = portalData.students.find(entry => entry.id.toLowerCase() === score.student.toLowerCase() || entry.name.toLowerCase() === score.student.toLowerCase());
        if (!student) throw new Error(`No student record matches "${score.student}". Check the spelling or student ID.`);
        if (student.class !== row.class) throw new Error(`${student.name} is in ${student.class}, not ${row.class}.`);
        return { studentId: student.id, studentName: student.name, score: score.score };
      });
      if (new Set(row.scores.map(score => score.studentId)).size !== row.scores.length) throw new Error("A student appears more than once in this CSV. Keep only one score per student.");
      row.note = row.note || "";
      if (currentRole === "Teacher") row.teacher = currentUser.name;
      row.id = newId("R", portalData.results);
      row.date = todayIso;
      row.term = document.getElementById("academicTerm").value;
      row.status = "Pending";
      portalData.results.unshift(row);
      if (!await saveData()) { renderModule("Results"); return; }
      closeModal();
      renderDashboard();
      renderModule("Results");
      showToast(`${parsed.length} scores uploaded. Review them before publishing.`);
      return;
    } catch (error) {
      console.error("Could not import student scores.", error);
      return showToast(error.message || "There was a problem reading this CSV.");
    }
  }
  const key = settings.key;
  const list = portalData[key];
  if (moduleName === "Admissions") { row.id = newId("ENQ", list); row.type = "Application"; row.date = todayIso; row.status = "New"; }
  if (moduleName === "Students") { row.id = newId("NS", list); row.status = "Active"; }
  if (moduleName === "Staff") { row.id = newId("ST", list); row.status = "Active"; }
  if (moduleName === "Assessments") { row.id = newId("AS", list); row.status = "Scheduled"; }
  if (moduleName === "Attendance") {
    const present = Number(row.present); const absent = Number(row.absent);
    if (!Number.isInteger(present) || !Number.isInteger(absent) || present < 0 || absent < 0) return showToast("Enter a valid non-negative number of students.");
    row.present = present; row.absent = absent;
    row.id = newId("AT", list); row.status = "Submitted";
    if (currentRole === "Teacher") row.teacher = currentUser.name;
  }
  if (moduleName === "Assessments" && currentRole === "Teacher") row.teacher = currentUser.name;
  if (moduleName === "Timetable") row.id = newId("TT", list);
  if (moduleName === "Fees") {
    const student = portalData.students.find(entry => entry.id === formData.get("studentId"));
    if (!student) return showToast("Select a student for this invoice.");
    row.student = student.name; row.studentId = student.id; row.class = student.class;
    const amount = Number(row.amount);
    if (!Number.isFinite(amount) || amount <= 0) return showToast("Enter a fee amount greater than zero.");
    row.amount = amount; row.id = newId("INV", list); row.status = "Pending";
  }
  if (moduleName === "Messages") {
    row.id = newId("MSG", list); row.from = currentUser.name; row.date = todayIso; row.status = "Sent";
  }
  list.unshift(row);
  if (!await saveData()) { renderModule(moduleName); return; }
  closeModal();
  if (moduleName === "Students") renderDashboard();
  renderModule(moduleName);
  showToast(`${moduleName === "Messages" ? "Message sent" : `${moduleName === "Students" ? "Student" : moduleName.slice(0, -1) || moduleName} saved`} successfully.`);
}

function parseCsvScores(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(line => line.trim());
  if (lines.length < 2) throw new Error("Add a header row and at least one student score.");
  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  const headers = splitCsv(lines[0], delimiter).map(value => value.toLowerCase().replace(/[^a-z0-9]/g, ""));
  const studentColumn = headers.findIndex(value => ["student", "studentname", "name", "studentid", "id"].includes(value));
  const scoreColumn = headers.findIndex(value => ["score", "mark", "marks", "total", "result"].includes(value));
  if (studentColumn < 0 || scoreColumn < 0) throw new Error("Include a student/name column and a score/marks column in the CSV.");
  const scores = lines.slice(1).map(line => {
    const columns = splitCsv(line, delimiter);
    const score = Number(columns[scoreColumn]);
    return { student: columns[studentColumn], score };
  });
  if (scores.some(row => !row.student || !Number.isFinite(row.score) || row.score < 0 || row.score > 100)) throw new Error("Each row needs a student name and a score from 0 to 100.");
  return scores;
}
function splitCsv(line, delimiter) {
  const fields = []; let current = ""; let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && quoted && line[index + 1] === '"') { current += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === delimiter && !quoted) { fields.push(current.trim()); current = ""; }
    else current += char;
  }
  if (quoted) throw new Error("The CSV contains an unfinished quoted field.");
  fields.push(current.trim());
  return fields;
}

function statusMarkup(status) {
  const className = /approved|paid|submitted|active|completed|sent|read|published/i.test(status) ? "" : /pending|scheduled|open|unread|overdue|review/i.test(status) ? " pending" : " draft";
  return `<span class="portal-status${className}">${escapeHtml(status)}</span>`;
}
function filterValue(id) { return document.getElementById(id)?.value || "all"; }
function renderDashboard() {
  const students = portalData.students;
  const pendingResults = portalData.results.filter(row => row.status === "Pending");
  const unpaidFees = portalData.fees.filter(row => row.status !== "Paid");
  const todaysAttendance = portalData.attendance.filter(row => row.date === todayIso);
  const present = todaysAttendance.reduce((total, row) => total + Number(row.present || 0), 0);
  const absent = todaysAttendance.reduce((total, row) => total + Number(row.absent || 0), 0);
  const attendancePercent = present + absent ? Math.round(present / (present + absent) * 100) : 0;
  const welcomeByRole = currentRole === "Student" ? "Your school at a glance" : currentRole === "Parent" ? "Your family's school portal" : "Your school at a glance";
  const nextClasses = portalData.timetable.filter(row => row.day === "Monday").slice(0, 4);
  document.getElementById("portalView").innerHTML = `
    <div class="portal-view-heading"><div><div class="portal-eyebrow">MONDAY, 12 OCTOBER 2026 · ${escapeHtml(currentRole.toUpperCase())} VIEW</div><h1>${welcomeByRole}</h1><p>Welcome, ${escapeHtml(roleLabels[currentRole])}. Here's what is happening at Northstar today.</p></div><button class="portal-btn" data-portal-action="quick">＋ Quick action</button></div>
    <div class="portal-stats"><article class="portal-stat"><span>Student records</span><strong>${students.length}</strong><small>${currentRole === "Administrator" ? "In the school directory" : "Available to your account"}</small></article><article class="portal-stat"><span>Attendance today</span><strong>${attendancePercent}%</strong><small>${present} students recorded present</small></article><article class="portal-stat"><span>Results to review</span><strong>${pendingResults.length}</strong><small>${currentRole === "Administrator" ? "Awaiting administrator approval" : "Your class submissions"}</small></article><article class="portal-stat"><span>Fees to follow up</span><strong>${unpaidFees.length}</strong><small>Invoices needing attention</small></article></div>
    <div class="portal-dashboard-grid"><section class="portal-panel"><div class="portal-panel-heading"><div><h2>Recently submitted results</h2><p>Review results before making them visible to students</p></div><button class="portal-link-button" data-module="Results">View results ↗</button></div><div class="portal-table-wrap"><table class="portal-dashboard-table"><thead><tr><th>CLASS</th><th>SUBJECT</th><th>TEACHER</th><th>DATE</th><th>STATUS</th></tr></thead><tbody>${portalData.results.slice(0, 4).map(result => `<tr><td>${escapeHtml(result.class)}</td><td>${escapeHtml(result.subject)}</td><td>${escapeHtml(result.teacher)}</td><td>${dateDisplay(result.date)}</td><td>${statusMarkup(result.status)}</td></tr>`).join("")}</tbody></table></div></section>
    <section class="portal-panel"><div class="portal-panel-heading"><div><h2>On today's timetable</h2><p>Monday · First term</p></div><button class="portal-link-button" data-module="Timetable">Full timetable ↗</button></div>${nextClasses.length ? nextClasses.map((item, index) => `<div class="portal-schedule-item"><span class="portal-schedule-time">${escapeHtml(item.time)}</span><span class="portal-schedule-line ${["", "amber", "blue", "purple"][index % 4]}"></span><span class="portal-schedule-copy"><strong>${escapeHtml(item.subject)}</strong><small>${escapeHtml(item.class)} · ${escapeHtml(item.room)}</small></span><span class="portal-schedule-badge">${index === 0 ? "Today" : "Next"}</span></div>`).join("") : "<div class=\"portal-empty\">No lessons on today's timetable.</div>"}</section>
    <section class="portal-panel"><div class="portal-panel-heading"><div><h2>Needs a little attention</h2><p>School tasks and reminders</p></div></div>${currentRole === "Administrator" ? `<button class="portal-todo" data-module="Decisions"><span>✓</span><span><strong>Administrator decision centre</strong><small>Admissions, results and school approvals</small></span>›</button>` : ""}<button class="portal-todo" data-module="Results"><span>!</span><span><strong>${currentRole === "Administrator" ? "Results awaiting review" : "Class results"}</strong><small>${pendingResults.length} class result sets need attention</small></span>›</button><button class="portal-todo" data-module="Fees"><span>₦</span><span><strong>Family fee payments</strong><small>${unpaidFees.length} invoices are not marked paid</small></span>›</button><button class="portal-todo" data-module="Messages"><span>✉</span><span><strong>Family messages</strong><small>${portalData.messages.filter(row => row.status === "Unread").length} unread messages</small></span>›</button></section>
    <section class="portal-panel"><div class="portal-panel-heading"><div><h2>School community</h2><p>Useful places to pick up where you left off</p></div></div><button class="portal-todo" data-module="Students"><span>♙</span><span><strong>Student directory</strong><small>${students.length} student profiles</small></span>↗</button><button class="portal-todo" data-module="Assessments"><span>☷</span><span><strong>Upcoming assessments</strong><small>${portalData.assessments.filter(row => row.status === "Scheduled" || row.status === "Open").length} open or upcoming</small></span>↗</button><button class="portal-todo" data-module="Attendance"><span>◷</span><span><strong>Class attendance</strong><small>Daily attendance register</small></span>↗</button></section></div>`;
  document.querySelectorAll("#portalView [data-module]").forEach(button => button.addEventListener("click", () => goToModule(button.dataset.module)));
  document.querySelectorAll("#portalView .portal-dashboard-table tbody tr").forEach((row, index) => {
    row.classList.add("portal-row-enter");
    row.style.animationDelay = `${index * 45}ms`;
  });
  document.querySelector('[data-portal-action="quick"]')?.addEventListener("click", openQuickActions);
  animatePortalView();
}
function openQuickActions() {
  const options = ["Admissions", "Students", "Staff", "Results", "Assessments", "Attendance", "Timetable", "Fees", "Messages"].filter(name => visibleModules().includes(name) && (name !== "Timetable" || currentRole === "Administrator"));
  const body = `<p class="sign-in-note">Choose a school task to get started.</p><div class="quick-action-list">${options.map(name => `<button class="quick-action-option" data-quick-module="${escapeHtml(name)}"><span>${escapeHtml(name === "Results" ? "▤" : name === "Students" ? "♙" : name === "Staff" ? "♧" : name === "Admissions" ? "↗" : name === "Attendance" ? "◷" : name === "Fees" ? "₦" : name === "Messages" ? "✉" : "☷")}</span><span>${escapeHtml(name === "Results" ? "Upload or check results" : name === "Admissions" ? "Review applications" : name === "Students" ? currentRole === "Administrator" ? "Add a student" : "View student directory" : name === "Staff" ? currentRole === "Administrator" ? "Add a staff member" : "View staff directory" : name === "Assessments" ? "Create an assessment" : name === "Attendance" ? "Record attendance" : name === "Fees" ? "Create a fee invoice" : name === "Messages" ? "Send a school message" : "Add a timetable lesson")}</span><span>›</span></button>`).join("")}</div>`;
  openModal("What would you like to do?", body, () => {});
  document.querySelectorAll("[data-quick-module]").forEach(button => button.addEventListener("click", () => {
    const name = button.dataset.quickModule;
    closeModal();
    goToModule(name);
    if (currentRole !== "Administrator" && ["Students", "Staff"].includes(name)) return;
    openCreateForm(name);
  }));
}

function renderDecisionCentre() {
  const pendingResults = portalData.results.filter(row => row.status === "Pending");
  const pendingAdmissions = portalData.enquiries.filter(row => ["New", "Contacted"].includes(row.status));
  const pendingFees = portalData.fees.filter(row => row.status === "Pending" || row.status === "Overdue");
  document.getElementById("portalView").innerHTML = `
    <div class="portal-view-heading"><div><div class="portal-eyebrow">ADMINISTRATOR · AUTHORIZED DECISIONS</div><h1>Decision centre</h1><p>Review school requests and publish decisions. Only an administrator can approve these changes.</p></div></div>
    <div class="portal-stats decision-stats"><article class="portal-stat"><span>Admissions to review</span><strong>${pendingAdmissions.length}</strong><small>New applications and enquiries</small></article><article class="portal-stat"><span>Results awaiting approval</span><strong>${pendingResults.length}</strong><small>Not yet visible to families</small></article><article class="portal-stat"><span>Fees to follow up</span><strong>${pendingFees.length}</strong><small>Unpaid invoices</small></article><article class="portal-stat"><span>Active school accounts</span><strong><button class="portal-link-button" data-module="Accounts">Manage accounts ↗</button></strong><small>Create or revoke portal access</small></article></div>
    <div class="portal-dashboard-grid"><section class="portal-panel"><div class="portal-panel-heading"><div><h2>Admissions decisions</h2><p>Enrol applicants after reviewing their details</p></div><button class="portal-link-button" data-module="Admissions">All admissions ↗</button></div>${pendingAdmissions.length ? `<div class="decision-list">${pendingAdmissions.slice(0, 6).map(row => `<article class="decision-item"><span class="decision-icon">↗</span><div><strong>${escapeHtml(row.student || row.name || "Family enquiry")}</strong><small>${escapeHtml(row.guardian || row.email)} · ${escapeHtml(row.class || "New enquiry")}</small></div><button class="portal-row-action admission-enroll" data-id="${escapeHtml(row.id)}">${row.student ? "Enrol" : "Mark contacted"}</button></article>`).join("")}</div>` : '<div class="portal-empty decision-empty">No admissions decisions are waiting.</div>'}</section>
    <section class="portal-panel"><div class="portal-panel-heading"><div><h2>Results to publish</h2><p>Published reports become available to linked student and parent accounts</p></div><button class="portal-link-button" data-module="Results">All results ↗</button></div>${pendingResults.length ? `<div class="decision-list">${pendingResults.slice(0, 6).map(row => `<article class="decision-item"><span class="decision-icon">▤</span><div><strong>${escapeHtml(row.class)} · ${escapeHtml(row.subject)}</strong><small>${escapeHtml(row.teacher)} · ${(row.scores || []).length} student scores</small></div><button class="portal-row-action approve-result" data-id="${escapeHtml(row.id)}">Publish</button></article>`).join("")}</div>` : '<div class="portal-empty decision-empty">No results are waiting for approval.</div>'}</section></div>`;
  document.querySelectorAll("#portalView [data-module]").forEach(button => button.addEventListener("click", () => goToModule(button.dataset.module)));
  document.querySelectorAll(".approve-result").forEach(button => button.addEventListener("click", () => approveResult(button.dataset.id)));
  document.querySelectorAll(".admission-enroll").forEach(button => button.addEventListener("click", () => updateAdmission(button.dataset.id)));
  animatePortalView();
}
async function renderAccounts() {
  const view = document.getElementById("portalView");
  view.innerHTML = `<div class="portal-view-heading"><div><div class="portal-eyebrow">ADMINISTRATOR · ACCESS CONTROL</div><h1>${escapeHtml(moduleSettings.Accounts.title)}</h1><p>${escapeHtml(moduleSettings.Accounts.description)}</p></div><button class="portal-btn" id="addPortalEntry">＋ Create account</button></div><div class="portal-search-row"><label class="portal-search"><span>⌕</span><input id="accountSearch" type="search" placeholder="Search accounts..."></label><div class="portal-filters"><span class="portal-record-count" id="accountCount"></span></div></div><div id="accountTable" class="portal-table-panel"><div class="portal-empty">Loading accounts…</div></div>`;
  document.getElementById("addPortalEntry").addEventListener("click", () => openCreateForm("Accounts"));
  document.getElementById("accountSearch").addEventListener("input", () => paintAccounts());
  try {
    const { accounts } = await apiRequest("/api/admin/accounts");
    if (currentModule !== "Accounts") return;
    portalAccounts = accounts;
    paintAccounts();
    animatePortalView();
  } catch (error) {
    document.getElementById("accountTable").innerHTML = `<div class="portal-empty">${escapeHtml(error.message)}</div>`;
  }
}
function paintAccounts() {
  const query = (document.getElementById("accountSearch")?.value || "").trim().toLowerCase();
  const accounts = portalAccounts.filter(account => [account.name, account.email, account.role, account.className, account.studentId].some(value => String(value || "").toLowerCase().includes(query)));
  const linkedStudents = new Map(portalData.students.map(student => [student.id, student]));
  document.getElementById("accountCount").textContent = `${accounts.length} account${accounts.length === 1 ? "" : "s"}`;
  const rows = accounts.map(account => {
    const linkedStudent = linkedStudents.get(account.studentId);
    const linkedTo = account.role === "teacher" ? account.className : linkedStudent ? `${linkedStudent.name} · ${linkedStudent.class}` : "—";
    return `<tr><td><span class="portal-cell-person"><span class="portal-person-avatar">${escapeHtml(initials(account.name))}</span>${escapeHtml(account.name)}</span></td><td>${escapeHtml(account.email)}</td><td>${escapeHtml(account.role[0].toUpperCase() + account.role.slice(1))}</td><td>${escapeHtml(linkedTo)}</td><td>${dateDisplay(account.createdAt)}</td><td><div class="account-actions"><button class="portal-row-action reset-account-password" data-id="${account.id}" data-name="${escapeHtml(account.name)}">Reset password</button>${account.role === "administrator" ? '<span class="portal-status">Protected</span>' : `<button class="portal-row-action remove-account" data-id="${account.id}" data-name="${escapeHtml(account.name)}">Revoke access</button>`}</div></td></tr>`;
  }).join("");
  document.getElementById("accountTable").innerHTML = `<div class="portal-table-wrap"><table class="portal-table"><thead><tr><th>ACCOUNT HOLDER</th><th>EMAIL</th><th>PORTAL ROLE</th><th>LINKED CLASS OR STUDENT</th><th>CREATED</th><th>ACCESS</th></tr></thead><tbody>${rows || '<tr><td class="portal-empty" colspan="6">No matching portal accounts.</td></tr>'}</tbody></table></div>`;
  document.querySelectorAll(".reset-account-password").forEach(button => button.addEventListener("click", () => openAccountPasswordReset(button.dataset.id, button.dataset.name)));
  document.querySelectorAll(".remove-account").forEach(button => button.addEventListener("click", () => confirmAccountRemoval(button.dataset.id, button.dataset.name)));
}
function openAccountPasswordReset(id, name) {
  const body = `<p class="sign-in-note">Set a new temporary password for ${escapeHtml(name)}. They can change it after signing in.</p><form id="accountPasswordForm"><label class="portal-form-field"><span>Temporary password · at least 12 characters</span><input name="password" type="password" minlength="12" maxlength="200" autocomplete="new-password" required></label><div class="portal-modal-actions"><button class="portal-btn portal-btn-secondary" data-cancel type="button">Cancel</button><button class="portal-btn" type="submit">Reset password</button></div></form>`;
  openModal("Reset account password", body, async (formData, form) => {
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    try {
      await apiRequest(`/api/admin/accounts/${encodeURIComponent(id)}/password`, { method: "POST", body: Object.fromEntries(formData) });
      closeModal();
      showToast(`A new temporary password has been set for ${name}.`);
    } catch (error) { showToast(error.message); }
    finally { submit.disabled = false; }
  });
}
function confirmAccountRemoval(id, name) {
  const body = `<p class="sign-in-note">This immediately revokes ${escapeHtml(name)}'s portal access and signs out their active sessions. School records are retained.</p><div class="portal-modal-actions"><button class="portal-btn portal-btn-secondary" data-cancel type="button">Keep account</button><button class="portal-btn danger-button" id="confirmAccountRemoval" type="button">Revoke access</button></div>`;
  openModal("Revoke portal access?", body, () => {});
  document.getElementById("confirmAccountRemoval").addEventListener("click", () => {
    const submit = document.getElementById("confirmAccountRemoval");
    submit.disabled = true;
    apiRequest(`/api/admin/accounts/${encodeURIComponent(id)}`, { method: "DELETE" }).then(() => {
      portalAccounts = portalAccounts.filter(account => String(account.id) !== String(id));
      closeModal();
      paintAccounts();
      showToast(`Portal access for ${name} has been revoked.`);
    }).catch(error => showToast(error.message)).finally(() => {
      if (submit.isConnected) submit.disabled = false;
    });
  });
}

function renderModule(name) {
  const settings = moduleSettings[name];
  let addButton = currentRole === "Administrator" || (currentRole === "Teacher" && ["Results", "Assessments", "Attendance", "Messages"].includes(name));
  if (name === "Results" && !["Administrator", "Teacher"].includes(currentRole)) addButton = false;
  const roleIntro = currentRole === "Student" || currentRole === "Parent"
    ? (name === "Results" ? "Choose a student to see results that have been reviewed and published by the school." : settings.description)
    : settings.description;
  document.getElementById("portalView").innerHTML = `
    <div class="portal-view-heading"><div><div class="portal-eyebrow">NORTHSTAR ACADEMY · ${escapeHtml(currentRole.toUpperCase())} VIEW</div><h1>${escapeHtml(settings.title)}</h1><p>${escapeHtml(roleIntro)}</p></div>${addButton ? `<button class="portal-btn" id="addPortalEntry">＋ ${escapeHtml(settings.action)}</button>` : ""}</div>
    ${name === "Results" && ["Student", "Parent"].includes(currentRole) ? renderStudentPicker() : ""}
    <div class="portal-search-row"><label class="portal-search"><span>⌕</span><input id="portalSearch" type="search" placeholder="Search ${escapeHtml(settings.title.toLowerCase())}..."></label><div class="portal-filters" id="portalFilters">${renderFilters(name)}</div></div>
    <div id="portalTable"></div>`;
  document.getElementById("addPortalEntry")?.addEventListener("click", () => openCreateForm(name));
  document.getElementById("portalSearch").addEventListener("input", () => renderTable(name));
  document.querySelectorAll("#portalFilters select").forEach(select => select.addEventListener("change", () => renderTable(name)));
  document.getElementById("portalResultStudent")?.addEventListener("change", event => {
    activeStudentId = event.target.value;
    renderStudentReport();
  });
  renderTable(name);
  animatePortalView();
}
function renderStudentPicker() {
  const available = portalData.students;
  const options = available.map(student => `<option value="${escapeHtml(student.id)}" ${student.id === activeStudentId ? "selected" : ""}>${escapeHtml(student.name)} · ${escapeHtml(student.class)}</option>`).join("");
  return `<section class="portal-panel result-student-check"><label for="portalResultStudent">Check results for</label><select id="portalResultStudent">${options || '<option value="">No linked student available</option>'}</select><div id="studentReport"></div></section>`;
}
function renderFilters(name) {
  if (name === "Admissions") return '<select id="statusFilter" aria-label="Filter admission requests"><option value="all">All enquiries</option><option>New</option><option>Contacted</option><option>Enrolled</option></select>';
  if (name === "Staff") return '<select id="statusFilter" aria-label="Filter staff status"><option value="all">All staff</option><option>Active</option><option>On leave</option></select>';
  if (name === "Results") return '<select id="statusFilter" aria-label="Filter by result status"><option value="all">All statuses</option><option>Pending</option><option>Approved</option></select><select id="classFilter" aria-label="Filter by class"><option value="all">All classes</option></select>';
  if (name === "Assessments") return '<select id="classFilter" aria-label="Filter by class"><option value="all">All classes</option></select><select id="statusFilter" aria-label="Filter by assessment status"><option value="all">All status</option><option>Scheduled</option><option>Open</option><option>Completed</option></select>';
  if (name === "Attendance") return '<select id="classFilter" aria-label="Filter by class"><option value="all">All classes</option></select>';
  if (name === "Fees") return '<select id="statusFilter" aria-label="Filter by invoice status"><option value="all">All payments</option><option>Paid</option><option>Pending</option><option>Overdue</option></select>';
  if (name === "Students") return '<select id="classFilter" aria-label="Filter by class"><option value="all">All classes</option></select><select id="statusFilter" aria-label="Filter by student status"><option value="all">All statuses</option><option>Active</option><option>Inactive</option></select>';
  if (name === "Messages") return '<select id="statusFilter" aria-label="Filter by message status"><option value="all">All messages</option><option>Unread</option><option>Read</option><option>Sent</option></select>';
  return "";
}
function filteredRows(name) {
  const settings = moduleSettings[name];
  let rows = [...portalData[settings.key]];
  const query = (document.getElementById("portalSearch")?.value || "").trim().toLowerCase();
  const status = filterValue("statusFilter");
  const selectedClass = filterValue("classFilter");
  if (query) rows = rows.filter(row => Object.values(row).flatMap(value => Array.isArray(value) ? value.map(item => JSON.stringify(item)) : [String(value ?? "")]).some(value => value.toLowerCase().includes(query)));
  if (status !== "all") rows = rows.filter(row => row.status === status);
  if (selectedClass !== "all") rows = rows.filter(row => row.class === selectedClass);
  if (currentRole === "Teacher" && name === "Results") rows = rows.filter(row => row.teacher === roleLabels.Teacher);
  if (["Student", "Parent"].includes(currentRole)) {
    const student = portalData.students.find(item => item.id === activeStudentId);
    if (name === "Results") rows = rows.filter(row => row.status === "Approved" && row.class === student?.class && (row.scores || []).some(score => score.studentId === student?.id || score.studentName?.toLowerCase() === student?.name.toLowerCase()));
    if (name === "Fees") rows = rows.filter(row => row.studentId === student?.id);
    if (name === "Assessments") rows = rows.filter(row => row.class === student?.class);
    if (name === "Attendance") rows = rows.filter(row => row.class === student?.class);
  }
  return rows;
}
function displayRow(name, row) {
  if (name === "Admissions") {
    const action = row.student && ["New", "Contacted"].includes(row.status) ? "Enroll student" : !row.student && row.status === "New" ? "Mark contacted" : "";
    return `<tr><td>${escapeHtml(row.student || row.name || "Family enquiry")}</td><td>${escapeHtml(row.guardian || "—")}</td><td>${escapeHtml(row.class || row.interest || "—")}</td><td>${escapeHtml(row.type || "Website enquiry")}</td><td>${dateDisplay(row.date)}</td><td>${action ? `<button class="portal-row-action admission-enroll" data-id="${escapeHtml(row.id)}">${action}</button>` : ""} ${statusMarkup(row.status || "New")}</td></tr>`;
  }
  if (name === "Staff") return `<tr><td><span class="portal-cell-person"><span class="portal-person-avatar">${escapeHtml(initials(row.name))}</span>${escapeHtml(row.name)}</span></td><td>${escapeHtml(row.id)}</td><td>${escapeHtml(row.role)}</td><td>${escapeHtml(row.subject)}</td><td>${escapeHtml(row.email)}</td><td>${escapeHtml(row.phone)}</td><td>${statusMarkup(row.status)}</td></tr>`;
  if (name === "Students") return `<tr><td><span class="portal-cell-person"><span class="portal-person-avatar">${escapeHtml(initials(row.name))}</span>${escapeHtml(row.name)}</span></td><td>${escapeHtml(row.id)}</td><td>${escapeHtml(row.class)}</td><td>${escapeHtml(row.guardian)}</td><td>${escapeHtml(row.phone)}</td><td>${statusMarkup(row.status)}</td></tr>`;
  if (name === "Results") {
    const action = row.status === "Pending" && currentRole === "Administrator" ? `<button class="portal-row-action approve-result" data-id="${escapeHtml(row.id)}">Approve &amp; publish</button>` : "";
    return `<tr><td>${escapeHtml(row.id)}</td><td>${escapeHtml(row.class)}</td><td>${escapeHtml(row.subject)}</td><td>${escapeHtml(row.teacher)}</td><td>${dateDisplay(row.date)}</td><td>${(row.scores || []).length}</td><td>${statusMarkup(row.status)} ${action}</td></tr>`;
  }
  if (name === "Assessments") return `<tr><td>${escapeHtml(row.title)}</td><td>${escapeHtml(row.class)}</td><td>${escapeHtml(row.subject)}</td><td>${dateDisplay(row.date)}</td><td>${escapeHtml(row.type)}</td><td>${statusMarkup(row.status)}</td></tr>`;
  if (name === "Attendance") return `<tr><td>${dateDisplay(row.date)}</td><td>${escapeHtml(row.class)}</td><td>${escapeHtml(row.present)}</td><td>${escapeHtml(row.absent)}</td><td>${escapeHtml(row.teacher)}</td><td>${statusMarkup(row.status)}</td></tr>`;
  if (name === "Timetable") return `<tr><td>${escapeHtml(row.day)}</td><td>${escapeHtml(row.time)}</td><td>${escapeHtml(row.class)}</td><td>${escapeHtml(row.subject)}</td><td>${escapeHtml(row.teacher)}</td><td>${escapeHtml(row.room)}</td></tr>`;
  if (name === "Fees") return `<tr><td>${escapeHtml(row.id)}</td><td>${escapeHtml(row.student)}</td><td>${escapeHtml(row.class)}</td><td>${escapeHtml(row.description)}</td><td>₦${Number(row.amount).toLocaleString("en-NG")}</td><td>${dateDisplay(row.due)}</td><td>${currentRole === "Administrator" && (row.status === "Pending" || row.status === "Overdue") ? `<button class="portal-row-action mark-paid" data-id="${escapeHtml(row.id)}">Mark paid</button>` : ""} ${statusMarkup(row.status)}</td></tr>`;
  if (name === "Messages") return `<tr class="message-row" tabindex="0" data-id="${escapeHtml(row.id)}"><td>${escapeHtml(row.from)}</td><td>${escapeHtml(row.audience)}</td><td>${escapeHtml(row.subject)}</td><td>${dateDisplay(row.date)}</td><td>${statusMarkup(row.status)}</td></tr>`;
  return "";
}
function renderTable(name) {
  if (name === "Results" && ["Student", "Parent"].includes(currentRole)) return renderStudentReport();
  const config = moduleSettings[name];
  const rows = filteredRows(name);
  let columns = config.columns;
  if (name === "Students" && currentRole === "Teacher") columns = config.columns;
  if (name === "Results" && currentRole !== "Administrator") columns = config.columns.filter(column => column !== "Students");
  const body = rows.map(row => displayRow(name, row)).join("");
  let extras = "";
  if (name === "Attendance") {
    const present = rows.reduce((sum, row) => sum + Number(row.present || 0), 0);
    const absent = rows.reduce((sum, row) => sum + Number(row.absent || 0), 0);
    extras = `<div class="portal-mini-grid"><div class="portal-mini-stat"><strong>${present}</strong><span>Present in shown records</span></div><div class="portal-mini-stat"><strong>${absent}</strong><span>Absent in shown records</span></div><div class="portal-mini-stat"><strong>${present + absent ? Math.round(present / (present + absent) * 100) : 0}%</strong><span>Attendance rate</span></div></div>`;
  }
  document.getElementById("portalTable").innerHTML = `<div class="portal-table-panel">${extras}<div class="portal-table-wrap"><table class="portal-table"><thead><tr>${columns.map(column => `<th>${escapeHtml(column.toUpperCase())}</th>`).join("")}</tr></thead><tbody>${body || `<tr><td class="portal-empty" colspan="${columns.length}">Nothing to show here yet. Try changing your search or add a new record.</td></tr>`}</tbody></table></div></div>`;
  document.querySelectorAll("#portalTable tbody tr:not(:has(.portal-empty))").forEach((row, index) => {
    row.classList.add("portal-row-enter");
    row.style.animationDelay = `${Math.min(index * 35, 280)}ms`;
  });
  document.querySelectorAll(".approve-result").forEach(button => button.addEventListener("click", () => approveResult(button.dataset.id)));
  document.querySelectorAll(".mark-paid").forEach(button => button.addEventListener("click", () => markInvoicePaid(button.dataset.id)));
  document.querySelectorAll(".admission-enroll").forEach(button => button.addEventListener("click", () => updateAdmission(button.dataset.id)));
  document.querySelectorAll(".message-row").forEach(row => {
    row.addEventListener("click", () => openMessage(row.dataset.id));
    row.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openMessage(row.dataset.id); } });
  });
  if (name === "Results") populateClassFilter(rows);
  if (name === "Students" || name === "Assessments" || name === "Attendance") populateClassFilter(portalData[config.key]);
}
function populateClassFilter(rows) {
  const select = document.getElementById("classFilter");
  if (!select) return;
  const previous = select.value;
  const usedClasses = [...new Set([...classes, ...rows.map(row => row.class).filter(Boolean)])];
  select.innerHTML = `<option value="all">All classes</option>${usedClasses.map(item => `<option ${item === previous ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}`;
}
function renderStudentReport() {
  const student = portalData.students.find(item => item.id === activeStudentId);
  const container = document.getElementById("studentReport");
  if (!container) return;
  if (!student) { container.innerHTML = '<div class="portal-empty">No student record is available for this account.</div>'; return; }
  const terms = document.getElementById("academicTerm").value;
  const scores = portalData.results.filter(result => result.status === "Approved" && result.class === student.class && (!result.term || result.term === terms))
    .flatMap(result => (result.scores || []).filter(score => score.studentId === student.id || score.studentName?.toLowerCase() === student.name.toLowerCase()).map(score => ({ ...score, subject: result.subject, term: result.term || "First term" })));
  const average = scores.length ? Math.round(scores.reduce((sum, score) => sum + Number(score.score), 0) / scores.length) : 0;
  const scoreRows = scores.map(score => `<tr><td>${escapeHtml(score.subject)}</td><td>${escapeHtml(score.score)} / 100</td><td>${gradeFor(score.score)}</td><td>${escapeHtml(score.term)}</td><td>${statusMarkup("Published")}</td></tr>`).join("");
  container.innerHTML = `<div class="result-report-card"><span><strong>${escapeHtml(student.name)}</strong> · ${escapeHtml(student.id)}</span><span><strong>${escapeHtml(student.class)}</strong></span>${scores.length ? `<span><strong>Average: ${average}%</strong></span>` : ""}</div><div class="portal-table-wrap"><table class="portal-table"><thead><tr><th>SUBJECT</th><th>SCORE</th><th>GRADE</th><th>TERM</th><th>STATUS</th></tr></thead><tbody>${scoreRows || '<tr><td class="portal-empty" colspan="5">No published results for this student and term yet. Your school will make results available here after review.</td></tr>'}</tbody></table></div>`;
}
function gradeFor(score) { const mark = Number(score); return mark >= 70 ? "A" : mark >= 60 ? "B" : mark >= 50 ? "C" : mark >= 45 ? "D" : "F"; }
async function approveResult(id) {
  if (currentRole !== "Administrator") return showToast("Only the administrator can publish school results.");
  const row = portalData.results.find(item => item.id === id);
  if (!row || row.status !== "Pending") return;
  const originalStatus = row.status;
  row.status = "Approved";
  if (!await saveData()) { row.status = originalStatus; renderModule("Results"); return; }
  if (currentModule === "Decisions") renderDecisionCentre();
  else { renderDashboard(); renderModule("Results"); }
  showToast("Results approved and published to the student portal.");
}
async function markInvoicePaid(id) {
  if (currentRole !== "Administrator") return showToast("Only the administrator can confirm school payments.");
  const invoice = portalData.fees.find(row => row.id === id);
  if (!invoice || invoice.status === "Paid") return;
  const originalStatus = invoice.status;
  invoice.status = "Paid";
  if (!await saveData()) { invoice.status = originalStatus; renderModule("Fees"); return; }
  renderDashboard();
  renderModule("Fees");
  showToast("The invoice is marked as paid.");
}
async function updateAdmission(id) {
  const request = portalData.enquiries.find(row => row.id === id);
  if (!request || currentRole !== "Administrator") return;
  if (!request.student) {
    request.status = "Contacted";
    if (!await saveData()) { renderModule("Admissions"); return; }
    if (currentModule === "Decisions") renderDecisionCentre();
    else renderModule("Admissions");
    showToast("The enquiry is marked for follow-up.");
    return;
  }
  if (request.status === "Enrolled") return;
  const alreadyEnrolled = portalData.students.some(student => student.name.trim().toLowerCase() === request.student.trim().toLowerCase());
  if (alreadyEnrolled) return showToast("A student with that name is already in the directory.");
  const student = {
    id: newId("NS", portalData.students),
    name: request.student,
    class: request.class || classes[0],
    guardian: request.guardian || "",
    phone: request.phone || "",
    email: request.email || "",
    status: "Active"
  };
  request.status = "Enrolled";
  portalData.students.unshift(student);
  if (!await saveData()) { renderModule("Admissions"); return; }
  if (currentModule === "Decisions") renderDecisionCentre();
  else renderModule("Admissions");
  showToast(`${student.name} has been added to the student directory.`);
}
async function openMessage(id) {
  const message = portalData.messages.find(row => row.id === id);
  if (!message) return;
  if (message.status === "Unread" && currentRole === "Administrator") {
    message.status = "Read";
    if (!await saveData()) { renderModule("Messages"); return; }
  }
  openModal(escapeHtml(message.subject), `<p class="message-detail-meta">From ${escapeHtml(message.from)} · ${dateDisplay(message.date)}</p><p class="message-detail-body">${escapeHtml(message.body)}</p><div class="portal-modal-actions"><button type="button" class="portal-btn" data-cancel>Close message</button></div>`, () => {});
  renderDashboard();
  renderModule("Messages");
}

function openAdmissionForm() {
  const body = `<p class="sign-in-note">Tell us about your family. The admissions team will follow up to arrange your school visit.</p><form id="admissionForm"><label class="portal-form-field"><span>Student's name</span><input name="student" required></label><label class="portal-form-field"><span>Parent or guardian name</span><input name="guardian" required></label><label class="portal-form-field"><span>Family email address</span><input name="email" type="email" required></label><label class="portal-form-field"><span>Phone number</span><input name="phone" type="tel"></label><label class="portal-form-field"><span>Class of interest</span><select name="class">${classes.map(item => `<option>${escapeHtml(item)}</option>`).join("")}</select></label><label class="portal-form-field"><span>A note for our admissions team</span><textarea name="message"></textarea></label><div class="portal-modal-actions"><button type="button" data-cancel class="portal-btn portal-btn-secondary">Maybe later</button><button class="portal-btn" type="submit">Request a school visit ↗</button></div></form>`;
  openModal("Come see Northstar for yourself", body, async formData => {
    try {
      await apiRequest("/api/public/enquiries", { method: "POST", body: { ...Object.fromEntries(formData), type: "School visit" } });
      closeModal();
      showToast("Thank you! The admissions team has received your visit request.");
    } catch (error) { showToast(error.message); }
  });
}
async function submitContactForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  try {
    await apiRequest("/api/public/enquiries", { method: "POST", body: { ...payload, type: "Website enquiry" } });
    form.reset();
    showToast("Thanks for your note. Our school team will be in touch.");
  } catch (error) { showToast(error.message); }
  finally { submit.disabled = false; }
}

function animatePortalView() {
  const view = document.getElementById("portalView");
  view.classList.remove("portal-view-enter");
  void view.offsetWidth;
  view.classList.add("portal-view-enter");
}
function initializePublicMotion() {
  const revealTargets = document.querySelectorAll(".intro-section,.learning-inner,.admissions-card,.section-heading,.news-card,.contact-inner,.footer-main");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach(element => element.classList.add("is-visible"));
  } else {
    revealTargets.forEach(element => element.classList.add("reveal-on-scroll"));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }), { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach(element => revealObserver.observe(element));
  }
  const navigation = [...document.querySelectorAll(".site-nav-link")];
  const sections = navigation.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navigationObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (!visible) return;
      navigation.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach(section => navigationObserver.observe(section));
  }
  let scrollFrame = 0;
  const updateScrollProgress = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
      document.documentElement.style.setProperty("--page-progress", `${progress}%`);
      document.querySelector(".site-header").classList.toggle("is-scrolled", window.scrollY > 8);
      scrollFrame = 0;
    });
  };
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();
}

document.querySelectorAll("[data-open-portal]").forEach(button => button.addEventListener("click", openSignIn));
document.querySelectorAll("[data-admission]").forEach(button => button.addEventListener("click", openAdmissionForm));
document.querySelectorAll(".portal-nav-item").forEach(button => button.addEventListener("click", () => goToModule(button.dataset.module)));
document.getElementById("leavePortal").addEventListener("click", leavePortal);
document.getElementById("changePassword").addEventListener("click", openPasswordChange);
document.getElementById("returnToSite").addEventListener("click", leavePortal);
document.getElementById("portalBrand").addEventListener("click", event => { event.preventDefault(); goToModule("Dashboard"); });
document.getElementById("portalMenuToggle").addEventListener("click", () => document.getElementById("portalSidebar").classList.toggle("open"));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", event => { if (event.target.id === "modalBackdrop") closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
document.getElementById("academicTerm").addEventListener("change", () => currentModule === "Results" ? renderModule("Results") : null);
document.getElementById("contactForm").addEventListener("submit", submitContactForm);
document.getElementById("mobileNavToggle").addEventListener("click", () => {
  const nav = document.getElementById("siteNav");
  const open = nav.classList.toggle("open");
  document.getElementById("mobileNavToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".site-nav-link").forEach(link => link.addEventListener("click", () => {
  document.getElementById("siteNav").classList.remove("open");
  document.getElementById("mobileNavToggle").setAttribute("aria-expanded", "false");
}));
initializePublicMotion();
setupPortalAuth();
window.addEventListener("popstate", () => {
  if (window.location.pathname === "/portal") showPortalAuth();
  else showHomepage();
});
if (window.location.pathname === "/portal") showPortalAuth();
