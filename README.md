# Dayflow — Human Resource Management System

**A centralized platform for employee, attendance, leave, and payroll management.**

Built for the **Odoo × NMIT Bangalore Hackathon 2026**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem / Motivation](#problem--motivation)
3. [Objectives](#objectives)
4. [Key Features](#key-features)
5. [User Roles](#user-roles)
6. [Technology Stack](#technology-stack)
7. [System Architecture](#system-architecture)
8. [Database Design](#database-design)
9. [Project Structure](#project-structure)
10. [Team Responsibilities](#team-responsibilities)
11. [Setup & Installation](#setup--installation)
12. [Environment Variables](#environment-variables)
13. [Git Workflow](#git-workflow)
14. [Development Status](#development-status)
15. [Security Practices](#security-practices)
16. [Future Enhancements](#future-enhancements)
17. [Hackathon Information](#hackathon-information)
18. [License](#license)

---

## Project Overview

Dayflow is a Human Resource Management System (HRMS) designed to provide a centralized platform for managing employee information, attendance, leave requests, payroll, and core HR operations.

The system is built around two primary user roles — **Admin/HR** and **Employee** — with a **React (Vite)** frontend consuming a **Spring Boot** REST API backend, backed by a **MySQL** database.

> **Note:** This repository is in its initial development phase. The project structure and skeleton have been set up; business logic, APIs, and UI functionality are being implemented incrementally by the team. See [Development Status](#development-status) for exactly what exists today.

## Problem / Motivation

Many small and mid-sized organizations still manage HR processes — attendance, leave, and payroll — through manual methods like spreadsheets or disconnected tools. This leads to:

- Inconsistent or duplicated employee records
- Manual, error-prone attendance and leave tracking
- Lack of visibility for HR into real-time workforce data
- No self-service option for employees to check their own attendance, leave status, or payroll

Dayflow aims to address this by consolidating these HR functions into a single, role-based web application with a clean separation between HR/Admin operations and employee self-service.

## Objectives

- Provide a **single source of truth** for employee data referenced by attendance, leave, and payroll modules.
- Give **Admin/HR** a centralized dashboard to manage employees, monitor attendance, approve/reject leave, and manage payroll.
- Give **Employees** self-service access to check in/out, apply for leave, view leave history, and view payroll.
- Enforce **secure, role-based authentication** using JWT.
- Maintain a **simple, maintainable architecture** — one Spring Boot backend, one MySQL database, no microservices.

## Key Features

The following are the **planned** feature set for Dayflow. Implementation status for each is tracked separately in [Development Status](#development-status) — this section describes system scope, not current completion.

| Feature Area | Description |
|---|---|
| Authentication | Login and role-based access control using JWT |
| Employee Management | Create, view, update employee profiles and records |
| Attendance | Check-in / check-out and attendance history tracking |
| Leave Management | Leave application, leave history, and approval/rejection workflow |
| Payroll | Salary information and payroll viewing, admin-managed |
| Admin Dashboard | Organization-wide stats, employee, attendance, leave, and payroll management |
| Employee Dashboard | Personal profile, attendance, leave, and payroll self-service views |

## User Roles

Dayflow supports two roles:

1. **Admin / HR** — manages employees, monitors attendance, approves/rejects leave, and manages payroll.
2. **Employee** — views their own profile, marks attendance, applies for leave, and views payroll.

## Technology Stack

**Frontend**
- React
- Vite
- JavaScript / JSX
- Axios
- React Router

**Backend**
- Java
- Spring Boot
- Maven
- Spring Web
- Spring Data JPA
- Spring Security
- Jakarta Validation
- JWT

**Database**
- MySQL

**Testing**
- Postman
- Spring Boot Test

**Version Control**
- Git
- GitHub

## System Architecture

Dayflow follows a simple, single-backend, single-database architecture:

```text
React + Vite
      ↓
   Axios
      ↓
Spring Boot REST API
      ↓
Spring Data JPA
      ↓
   MySQL
```

The project uses **one Spring Boot backend application** and **one MySQL database**. There is no microservices split — all backend modules (auth, user, employee, payroll, attendance, leave) live within a single Spring Boot codebase for simplicity and maintainability during the hackathon.

## Database Design

The system is designed around five core entities:

```text
User
Employee
Attendance
LeaveRequest
Payroll
```

**High-level relationship:**

```text
User
  ↓
Employee
  ├── Attendance
  ├── LeaveRequest
  └── Payroll
```

**Employee identifiers:**

| Field | Type | Description |
|---|---|---|
| `id` | `Long` | Database primary key |
| `employeeId` | `String` | Human-readable identifier, e.g. `EMP017` |

Example:
```text
id = 17
employeeId = EMP017
```

For the initial implementation, the Attendance and LeaveRequest modules (owned by Member 2) reference the employee using `Long employeeId`, per the agreed contract between backend owners.

> Database tables have **not** been created yet in this repository — this section documents the planned schema/design only.

## Project Structure

```text
DAYFLOW/
│
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/dayflow/
│       │   │   ├── auth/
│       │   │   ├── user/
│       │   │   ├── employee/
│       │   │   ├── payroll/
│       │   │   ├── security/
│       │   │   ├── exception/
│       │   │   ├── config/
│       │   │   ├── attendance/
│       │   │   └── leave/
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── admin/
│       │   └── employee/
│       ├── pages/
│       │   ├── auth/
│       │   ├── admin/
│       │   └── employee/
│       ├── services/
│       ├── hooks/
│       ├── utils/
│       └── assets/
│
├── database/
│   └── README.md
│
├── docs/
│   ├── API_CONTRACT.md
│   └── TEAM_STRUCTURE.md
│
├── README.md
└── .gitignore
```

## Team Responsibilities

| Member | Area | Responsibilities |
|---|---|---|
| **Member 1** | Core Backend | Authentication, User, Employee, Payroll, Security, Exception handling, Core backend configuration |
| **Member 2** | Attendance + Leave Backend | Attendance, check-in/check-out, attendance records, leave requests, leave approval/rejection |
| **Member 3** | Admin/HR Frontend | Admin dashboard, employee management UI, attendance monitoring UI, leave approval UI, payroll management UI |
| **Member 4** | Employee Frontend + Integration | Employee dashboard, profile, attendance UI, check-in/check-out UI, leave application, leave history, payroll viewing, frontend/API integration |

## Setup & Installation

### Prerequisites

- Java (JDK) and Maven installed
- Node.js and npm installed
- MySQL installed and running locally

### Backend

1. Clone the repository.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Configure MySQL locally and create a database named:
   ```text
   dayflow
   ```
4. Configure `application.properties` using local environment variables or placeholder values — **do not commit real credentials**.
5. Build and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on Vite's default development server (port as shown in your terminal output).

## Environment Variables

Sensitive configuration must **never** be committed to the repository. Use a local `.env` file (kept untracked via `.gitignore`) or local environment variables instead.

Expected variables include (values are placeholders only):

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
VITE_API_BASE_URL=
```

- Do not commit `.env` files.
- Do not commit real database credentials or JWT secrets.
- Use placeholder/example values only in version-controlled files (e.g. `.env.example`).

## Git Workflow

**Branch structure:**

```text
main
│
├── feature/core-backend        (Member 1)
├── feature/attendance-leave    (Member 2)
├── feature/admin-frontend      (Member 3)
└── feature/employee-frontend   (Member 4)
```

**Guidelines:**

1. Work on your assigned feature branch.
2. Commit regularly and meaningfully — hourly commits are encouraged during active hackathon development.
3. Push your branch to the remote repository.
4. Pull/rebase or merge carefully before integrating with `main`.
5. Open a Pull Request when your work is ready for review/integration.
6. Avoid directly modifying another member's assigned package or area without discussion.

**Example commit workflow:**

```bash
git add .
git commit -m "feat: build employee dashboard"
git push
```

## Development Status

| Component | Status |
|---|---|
| Project structure | ✅ Set up |
| Backend skeleton | ✅ Set up |
| Frontend skeleton | ✅ Set up |
| Database design | 📋 Planned |
| Authentication | 📋 Planned |
| Employee management | 📋 Planned |
| Attendance | 📋 Planned |
| Leave management | 📋 Planned |
| Payroll | 📋 Planned |
| Admin dashboard | 📋 Planned |
| Employee dashboard | 📋 Planned |
| API integration | 📋 Planned |

> This table reflects the repository at the initial scaffolding stage. As features are implemented, update each row to `🚧 In Progress` or `✅ Implemented` accordingly — statuses should always match the actual code in the repository, not the intended roadmap.

## Security Practices

- Never commit passwords or credentials.
- Never commit JWT secrets.
- Never commit `.env` files.
- Never expose database connection strings in code or documentation.
- Use environment variables for all sensitive configuration.
- Validate all incoming request data (Jakarta Validation).
- Use role-based authorization to protect Admin and Employee endpoints.

## Future Enhancements

Potential areas for extension beyond the hackathon scope:

- Email notifications for leave approval/rejection
- Payroll PDF payslip generation
- Reporting and analytics dashboards
- Multi-department/organization support
- File upload for employee documents

## Hackathon Information

Dayflow is being built as a hackathon project for the **Odoo × NMIT Bangalore Hackathon 2026**, with a focus on:

- Clean, maintainable architecture
- A responsive, role-based frontend
- A well-structured REST API backend
- Reliable data management and validation
- Practical, real-world HR use cases
- Collaborative, branch-based team Git workflow

This project is a hackathon prototype and is **not** described as production-ready, enterprise-grade, or fully secure.

## License

License: To be determined
