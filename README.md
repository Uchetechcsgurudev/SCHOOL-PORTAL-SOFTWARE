# Northstar Academy School Website and Portal

Northstar Academy is a responsive public school website with a server-backed school portal. The public site covers school information, learning programmes, admissions enquiries and contact requests. The private portal provides role-based access to school records, result uploads and review, assessments, attendance, fees, timetables, messages and user accounts.

This application is in the `school-portal` directory and runs independently of the existing MailFlow application in the workspace root.

## Contents

- [Requirements](#requirements)
- [Run locally](#run-locally)
- [Initial school setup](#initial-school-setup)
- [Portal roles and permissions](#portal-roles-and-permissions)
- [Portal user guide](#portal-user-guide)
- [Public website](#public-website)
- [Data storage and backups](#data-storage-and-backups)
- [Configuration](#configuration)
- [Security and deployment](#security-and-deployment)
- [HTTP API reference](#http-api-reference)
- [Troubleshooting](#troubleshooting)
- [Current scope and limitations](#current-scope-and-limitations)

## Requirements

- Node.js (the project was validated with Node.js 24).
- The workspace's installed dependencies, including `express` and `better-sqlite3`.

The root `package.json` already declares the runtime dependencies. No separate package installation is needed when `node_modules` is present.

## Run locally

From the `school-portal` directory in PowerShell (also the directory to use after cloning this standalone repository):

```powershell
npm.cmd install
npm.cmd start
```

Alternatively, from the workspace root, run `node school-portal\server.js` when the workspace's root dependencies have already been installed.

Open [http://127.0.0.1:3030](http://127.0.0.1:3030). The **School portal** buttons navigate directly to `/portal`; the portal route opens the sign-in or first-administrator setup screen. The public homepage is at `/`.

The development server listens only on `127.0.0.1` by default. Keep the terminal running while using the application. Stop it with `Ctrl+C`.

Opening `school-portal\index.html` directly with a `file://` URL displays the static public website, but the authenticated portal and public enquiry submissions need the server. For a full feature check, use the HTTP address above.

## Initial school setup

### Create the first administrator on localhost

1. Start the server and visit `http://127.0.0.1:3030/portal`.
2. Select **Set up the first administrator**.
3. Enter the administrator's name, email and a password of at least 12 characters.
4. Submit the form. The account is signed in automatically.
5. Create staff, student and family user accounts from **User accounts**.

There is no default password or built-in administrator account. First-admin setup is permanently closed once the first user is created. A second setup attempt is rejected.

### Setup before making the server remotely reachable

When binding to a non-local address or using production mode, the server requires a one-time `SCHOOL_SETUP_KEY` of at least 32 bytes. Generate a private random key in PowerShell:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$rng.Dispose()
$setupKey = [Convert]::ToBase64String($bytes)
$setupKey
```

Keep the key private. Supply it in the server process environment and securely share it with the intended administrator:

```powershell
$env:SCHOOL_HOST = "0.0.0.0"
$env:SCHOOL_SETUP_KEY = "<private one-time key>"
node school-portal\server.js
```

The first administrator setup form will ask for this key. The key is consumed after successful creation of the initial administrator. The database then permanently closes public bootstrap. After setup, remove the key from the environment; an already initialized database can start without it. Keep it available only while an uninitialized database needs its first administrator.

## Portal roles and permissions

Permissions are checked by the server, not just hidden in the browser.

| Role | Portal access |
| --- | --- |
| **Administrator** | Full school dashboard and records; create students, staff, schedules, invoices, assessments, messages and accounts; manage admissions; approve and publish result sets; mark invoices paid; revoke portal accounts; reset account passwords; access the audit log API. |
| **Teacher** | Read students in the assigned class and the staff directory; submit pending result sets for that class; record attendance and create assessments for the assigned class; view the teacher's own submitted results and messages; send messages to permitted audiences. Teachers cannot publish results, manage accounts, enrol applicants, change fees or edit the timetable. |
| **Parent** | View the linked student's published results, class assessments, attendance, timetable and fee invoices. The family role is read-only in the portal interface. |
| **Student** | View the student's own published results, class assessments, attendance, timetable and fee invoices. The student role is read-only in the portal interface. |

Each parent and student account is linked to one student record. Teachers are assigned a class. Server responses are scoped to those assignments, so a client cannot gain wider data access by changing browser controls or sending an unauthorized request.

## Portal user guide

### Administrator

- **Overview:** View school records and operational summaries.
- **Decision centre:** Review new admissions and enquiries, enrol applicants, and publish pending results.
- **Admissions:** Track public applications, school-visit requests and website enquiries. Enrolling an applicant adds the student to the directory.
- **Students / Staff:** Add directory records.
- **User accounts:** Create teacher, parent and student sign-ins. Assign teachers to a class and link family/student users to a student. Reset passwords or revoke an account to immediately end its active sessions.
- **Results & reports:** Upload CSV marks, inspect pending submissions and publish them. Published marks are visible to the relevant linked student or parent.
- **Assessments:** Schedule exams, tests, quizzes and assignments.
- **Attendance:** Record class attendance.
- **Timetable:** Add lessons with day, time, class, teacher and room.
- **Fees & payments:** Create student invoices and mark payments as paid.
- **Messages:** Read messages and compose notices for supported audiences.
- **Change password:** Use the key icon beside the signed-in account to change the current password.

The audit log is currently exposed through the administrator-only `GET /api/admin/audit` endpoint; there is not yet an audit-log screen in the portal interface.

### Teacher

The teacher's assigned class is applied to the class selector. Results must be submitted as **Pending** and can only include students from that class. Teachers can submit attendance and assessments for that class. An administrator makes result publication and school-wide decisions.

### Parent and student

Use **Results & reports** to review published scores for the linked student and selected term. Other available modules show the linked student's permitted class information and invoices. Contact the school for account-link corrections; family users cannot change student records.

### Uploading results from CSV

Choose **Upload results**, select the class and subject, then upload a `.csv` file with a heading row and at least one score row. The parser accepts a student column named `student`, `student name`, `name`, `student id` or `id`, and a score column named `score`, `mark`, `marks`, `total` or `result` (spaces and punctuation in headings are ignored).

Example:

```csv
student,score
NS-2401,86
NS-2404,91
```

Scores must be numeric values from 0 to 100. Each student must match a record in the selected class, and each student may appear only once in an upload. A successful teacher upload remains pending until an administrator approves it. CSV contents are parsed in the browser; the server stores the resulting score records, not the uploaded file.

## Public website

The homepage includes school information, learning programme descriptions, admissions links, visit requests and a contact form. Public visit/contact forms submit to the server and create enquiry records for administrator review. Public form submissions require a valid email address; a school-visit request also requires the prospective student's and guardian's names.

## Data storage and backups

The default private database directory is:

```text
<workspace root>\.school-portal-private\
```

The SQLite database is `.school-portal-private\northstar-school.sqlite`, outside the statically served `school-portal` directory. It contains user accounts, password hashes, sessions, school state, application settings and audit events. The database directory can be changed with `SCHOOL_DATABASE_DIR`, but it must remain outside the public website directory.

On an empty database, the server initializes school records from [seed.json](./seed.json). This file contains illustrative school and student records. Review or replace the seed data before a real school's first startup; it is only loaded when the database is first created. Never put real student information in source control.

### Backup and restore

For a simple consistent backup:

1. Stop the server with `Ctrl+C`.
2. Copy the complete private database directory to an access-controlled backup location.
3. Restart the server.

To restore, stop the server and replace the active private database directory with the verified backup directory, then restart. Protect backups as sensitive student and account data. Establish a tested backup schedule and retention policy before relying on the portal for school operations.

## Configuration

The server reads process environment variables. It does **not** automatically load `.env`; `.env.example` is a reference template. In PowerShell, set values in the same terminal before starting Node:

```powershell
$env:SCHOOL_PORT = "3030"
$env:SCHOOL_HOST = "127.0.0.1"
$env:SCHOOL_DATABASE_DIR = "C:\SchoolData\Northstar"
npm.cmd start
```

| Variable | Default | Description |
| --- | --- | --- |
| `SCHOOL_PORT` | `3030` | HTTP port. |
| `SCHOOL_HOST` | `127.0.0.1` | Network interface to bind. The default makes the service local-only. |
| `SCHOOL_DATABASE_DIR` | `<workspace root>\.school-portal-private` | Private SQLite directory. Must resolve outside `school-portal`. |
| `SCHOOL_SETUP_KEY` | Empty | Required for first-time setup on a non-local listener or in `NODE_ENV=production`; minimum 32 bytes and consumed by successful initial-admin setup. Not needed to restart an initialized database. |
| `NODE_ENV` | Unset / development | Setting `production` enforces the setup-key requirement for first-time setup and enables secure cookies. |

The database path is resolved from the process environment and created if it does not exist. Avoid using a directory served by another public web server.

## Security and deployment

The application includes:

- Server-enforced role checks and role-scoped school-state responses.
- Scrypt password hashes with per-password salts; passwords are not stored as plaintext.
- Signed, HTTP-only, `SameSite=Strict` session cookies with an eight-hour lifetime and server-side session revocation.
- Failed-login throttling and public enquiry request throttling.
- Same-host origin checks on state-changing endpoints.
- Administrator-only account and audit-log endpoints.
- Response headers that reduce caching, framing and content-type risks.
- Default local-only binding and a one-time setup key requirement for production or a non-local listener.

These controls do not replace production operations. The SQLite database is not encrypted at rest; protect its directory and backups with operating-system access controls and storage encryption. Before public deployment, use HTTPS end-to-end, restrict network access, protect the host and database, configure monitored backups and recovery, review privacy and retention obligations for student data, and arrange operational account recovery. Use a production-appropriate database and deployment process for concurrent or larger school usage. Do not expose the development server directly to the public internet.

## HTTP API reference

All endpoints are served by the same origin as the website. Authenticated requests use the session cookie set at login/setup. JSON request bodies must use `Content-Type: application/json`.

| Method | Path | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Service health status. |
| `GET` | `/api/auth/setup-status` | Public | Reports whether first-admin setup is open and whether a setup key is required. |
| `POST` | `/api/auth/setup` | Public until setup closes | Creates the one initial administrator; includes `name`, `email`, `password`, and `setupKey` when required. |
| `POST` | `/api/auth/login` | Public | Signs in with `email` and `password`. |
| `POST` | `/api/auth/logout` | Public/session-aware | Revokes the current session and clears its cookie. |
| `GET` | `/api/auth/me` | Signed in | Returns the current account's safe profile. |
| `POST` | `/api/auth/password` | Signed in | Changes the current user's password; requires `currentPassword` and a `newPassword` of at least 12 characters. |
| `GET` | `/api/school/state` | Signed in | Returns the school-state collections visible to the current role. |
| `PUT` | `/api/school/state` | Signed in | Submits school-state changes. Server validation and role rules determine which changes are accepted. |
| `GET` | `/api/admin/accounts` | Administrator | Lists portal accounts without password data. |
| `POST` | `/api/admin/accounts` | Administrator | Creates a teacher, parent or student account. Requires name, email, password and role; teachers need `className`, families need `studentId`. |
| `POST` | `/api/admin/accounts/:id/password` | Administrator | Sets a new temporary password and revokes the account's existing sessions. |
| `DELETE` | `/api/admin/accounts/:id` | Administrator | Revokes a non-administrator account and its sessions. Administrator accounts cannot be removed here. |
| `GET` | `/api/admin/audit` | Administrator | Returns the latest 100 audit events. |
| `POST` | `/api/public/enquiries` | Public | Stores a public admissions/contact enquiry. |
| `GET` | `/` and `/portal` | Public | Serves the public website or portal entry point. |

Errors are JSON objects with an `error` message and an appropriate HTTP status (for example, `401` unauthenticated, `403` forbidden, `400` invalid input, or `409` setup already claimed).

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Cannot open the site | Confirm the server terminal is still running and visit the configured port, normally `http://127.0.0.1:3030`. |
| “School server unavailable” | Make sure you opened the HTTP server address, not a `file://` page, and that the server started without an error. |
| First-admin setup does not appear | Setup is available only before the first account has been created. Ask the existing administrator to create an account. |
| Remote/production server refuses to start | Configure a private `SCHOOL_SETUP_KEY` at least 32 bytes long before startup. |
| Login fails after an administrator reset/revocation | Use the latest credentials provided by the administrator. Password resets and revocations invalidate existing sessions. |
| Teacher cannot submit a result | Confirm the teacher's assigned class, the selected CSV class, all student IDs/names, and score values. Results must be new, unique, pending submissions for that class. |
| Public forms submit but are not visible | Sign in as an administrator and review **Admissions & enquiries**. |

## Current scope and limitations

- This is a local school website and portal implementation, not a certified student-information or accounting platform.
- Seed records are illustrative and must be reviewed before real use.
- Result upload accepts CSV only. It does not retain uploaded source files or generate downloadable report-card PDFs.
- The current fees feature tracks invoices and administrator-confirmed payment status; it does not process online payments or reconcile a bank account.
- Admissions/contact requests are stored for administrator follow-up; email and SMS delivery integrations are not currently configured.
- School and portal names, text and sample data in the interface are currently Northstar-branded and require school-specific customization.
- Several overview labels and sample dates are fixed demonstration values; verify date handling and school-specific settings before operational use.
- Validate every workflow against the school's policies and applicable data-protection requirements before entering real student information.
