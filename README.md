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
13. [Documentation References](#documentation-references)
14. [License](#license)

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

### Admin/HR Features
- **Dashboard**: High-level statistics on headcount, attendance rates, leave requests, and payroll summary.
- **Employee Management**: Create, edit, and deactivate employee records with auto-generated system IDs.
- **Attendance Monitoring**: View daily attendance records, monitor check-in/out timestamps, filter by status.
- **Leave Management**: Review leave requests, approve or reject with comments, track employee leave balances.
- **Payroll Management**: Generate monthly payroll, manage salary components (Basic, HRA, Allowances, Deductions), calculate Net Pay.

### Employee Features
- **Employee Dashboard**: Quick view of attendance status, leave balance, recent notifications.
- **Systray Check-in/out Widget**: Instant check-in/out with live status dot and time counter.
- **Leave Self-Service**: Apply for leaves with automatic day count and view real-time approval status.
- **Payroll & Salary Slips**: View monthly salary breakdown and payment status.
- **Profile Management**: View personal details, employment details, and department information.

## Technology Stack

- **Backend**: Java 17+, Spring Boot 3.2.5, Spring Security, Spring Data JPA, JJWT 0.13.0
- **Frontend**: React 18, Vite, React Router v6, Lucide Icons, Vanilla CSS Design System
- **Database**: MySQL 8.0+ (Production/Dev), In-Memory H2 Database (Automated Test Suite)

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
