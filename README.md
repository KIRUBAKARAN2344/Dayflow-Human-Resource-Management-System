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
18. [Documentation References](#documentation-references)
19. [License](#license)

---

## Project Overview

Dayflow is a Human Resource Management System (HRMS) designed to provide a centralized platform for managing employee information, attendance, leave requests, payroll, and core HR operations.

The system is built around two primary user roles — **Admin/HR** and **Employee** — with a **React (Vite)** frontend consuming a **Spring Boot** REST API backend, backed by a **MySQL** database.

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
- H2 In-Memory Database (for integration testing)

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

The project uses **one Spring Boot backend application** and **one MySQL database**. All backend modules (auth, user, employee, payroll, attendance, leave) live within a single Spring Boot codebase for simplicity and maintainability during the hackathon.

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

- Java (JDK 17+) and Maven installed
- Node.js (v18+) and npm installed
- MySQL installed and running locally

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run tests:
   ```bash
   mvn clean test
   ```
3. Start the backend:
   ```bash
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

## Environment Variables

Expected variables include:

```env
DB_URL=jdbc:mysql://localhost:3306/dayflow?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_here
```

## Documentation References

- [API Contract Specification](docs/API_CONTRACT.md)
- [Team Structure & Responsibilities](docs/TEAM_STRUCTURE.md)

## License

License: MIT / Hackathon project license
