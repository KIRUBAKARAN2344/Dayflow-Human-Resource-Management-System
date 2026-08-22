<<<<<<< HEAD
# Dayflow — Human Resource Management System

Dayflow is a modern, enterprise-grade Human Resource Management System (HRMS) built with Spring Boot and React.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.3.5 / Java 21+
- **Security**: Spring Security & JWT
- **Persistence**: Spring Data JPA & MySQL
- **Validation**: Jakarta Validation

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: SPA Router

## Project Structure
- `backend/` — Spring Boot application backend
- `frontend/` — React/Vite web application frontend
- `database/` — Database schemas and setup instructions
- `docs/` — System documentation, API contracts, and team ownership specifications
=======
# ⚡ DAYFLOW

### Human Resource Management System

> **One workspace. Every employee. Every HR workflow.**

<p align="center">
  <img src="https://img.shields.io/badge/Odoo%20%C3%97%20NMIT-Bangalore%20Hackathon%202026-6C63FF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-SETUP-00C853?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Spring%20Boot-Java-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</p>

<p align="center">
  <b>Employee Management • Attendance • Leave • Payroll • HR Operations</b>
</p>

---

## 🚀 What is Dayflow?

**Dayflow** is a centralized Human Resource Management System designed to simplify everyday HR operations through a single digital platform.

Instead of using separate spreadsheets, manual attendance registers, disconnected leave systems, and payroll records, Dayflow brings everything together into one structured workflow.

### 👨‍💼 Admin / HR

- Employee management
- Workforce overview
- Attendance monitoring
- Leave approval and rejection
- Payroll management
- HR dashboard

### 👤 Employee

- Personal profile
- Employee dashboard
- Check-in / Check-out
- Attendance history
- Leave application
- Leave history
- Payroll visibility

---

## 💡 The Problem

Traditional HR workflows often depend on multiple disconnected systems.

```text
             TRADITIONAL HR

       📊 Spreadsheets
              +
       📝 Manual Records
              +
       📧 Messages / Emails
              +
       📁 Separate Payroll Files
              ↓
        ❌ Data Duplication
        ❌ Manual Errors
        ❌ Slow Approvals
        ❌ Poor Visibility
Dayflow changes this.
                    ⚡ DAYFLOW

              ┌─────────────────┐
              │   ADMIN / HR    │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    DAYFLOW      │
              │      HRMS       │
              └────────┬────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
   Attendance        Leave           Payroll
       │               │               │
       └───────────────┼───────────────┘
                       ▼
                 👤 EMPLOYEE
✨ Core Features
👤 Employee Experience
Feature	Description
🏠 Employee Dashboard	Personal HR overview
👤 Profile	View employee information
🟢 Check-in	Record daily attendance
🔴 Check-out	Complete attendance cycle
📅 Attendance	View attendance records
📝 Apply Leave	Submit leave requests
📋 Leave History	Track previous requests
💰 Payroll	View salary/payroll information
👨‍💼 Admin / HR Experience
Feature	Description
📊 Admin Dashboard	HR overview and statistics
👥 Employee Management	Manage employee records
🕐 Attendance Monitoring	Monitor workforce attendance
📝 Leave Management	Approve or reject requests
💰 Payroll Management	Manage employee payroll
🔎 Employee Details	View individual employee information
🧠 How Dayflow Works
                    USER
                     │
                     ▼
              ┌──────────────┐
              │    LOGIN     │
              └──────┬───────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
     👨‍💼 ADMIN              👤 EMPLOYEE
          │                     │
          ▼                     ▼
    Admin Dashboard      Employee Dashboard
          │                     │
     ┌────┼────┐          ┌─────┼─────┐
     ▼    ▼    ▼          ▼     ▼     ▼
   Users Attend Leave    Attend Leave Payroll
          │    │                │
          └────┼────────────────┘
               ▼
             MYSQL
🏗️ System Architecture

Dayflow follows a clean three-layer architecture.

┌─────────────────────────────────────────┐
│             FRONTEND LAYER              │
│                                         │
│          React + Vite + JSX             │
│                                         │
│    Admin UI        Employee UI          │
└────────────────────┬────────────────────┘
                     │
                   Axios
                     │
                     ▼
┌─────────────────────────────────────────┐
│              BACKEND LAYER              │
│                                         │
│          Java + Spring Boot             │
│                                         │
│ Auth │ Employee │ Payroll │ Attendance  │
│              Leave │ Security           │
└────────────────────┬────────────────────┘
                     │
               Spring Data JPA
                     │
                     ▼
┌─────────────────────────────────────────┐
│              DATABASE LAYER              │
│                                         │
│                  MySQL                  │
└─────────────────────────────────────────┘
Architecture Principles
One Spring Boot application
One MySQL database
REST API communication
Modular package structure
Role-based application flow
Clear frontend ownership
Shared API service layer
🗄️ Database Architecture

Dayflow is centered around five core entities:

                 ┌──────────┐
                 │   USER   │
                 └────┬─────┘
                      │
                      ▼
                ┌───────────┐
                │ EMPLOYEE  │
                └─────┬─────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
 ┌────────────┐ ┌────────────┐ ┌───────────┐
 │ ATTENDANCE │ │   LEAVE    │ │  PAYROLL  │
 └────────────┘ └────────────┘ └───────────┘
Employee Identification
id = 17
employeeId = EMP017
Field	Type	Purpose
id	Long	Database primary key
employeeId	String	Human-readable employee identifier
🛠️ Technology Stack
Frontend
<p> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square" /> <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" /> </p>
React
Vite
JavaScript / JSX
Axios
React Router
CSS
Backend
<p> <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" /> <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" /> <img src="https://img.shields.io/badge/Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white" /> <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white" /> </p>
Java
Spring Boot
Spring Web
Spring Data JPA
Spring Security
Jakarta Validation
JWT
Maven
Database
MySQL
Development & Testing
Git
GitHub
VS Code
Postman
Spring Boot Test
📁 Project Structure
DAYFLOW/
│
├── backend/
│   ├── pom.xml
│   │
│   └── src/
│       ├── main/
│       │   ├── java/com/dayflow/
│       │   │
│       │   ├── auth/
│       │   ├── user/
│       │   ├── employee/
│       │   ├── payroll/
│       │   ├── security/
│       │   ├── exception/
│       │   ├── config/
│       │   ├── attendance/
│       │   └── leave/
│       │
│       └── resources/
│
├── frontend/
│   │
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── admin/
│       │   └── employee/
│       │
│       ├── pages/
│       │   ├── auth/
│       │   ├── admin/
│       │   └── employee/
│       │
│       ├── services/
│       ├── hooks/
│       ├── utils/
│       └── assets/
│
├── database/
│
├── docs/
│
├── TEAM/
│
├── README.md
│
└── .gitignore
👥 Team Architecture

Dayflow follows a four-member modular development model.

                     ⚡ DAYFLOW TEAM
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    MEMBER 1           MEMBER 2        MEMBERS 3 & 4
    BACKEND             BACKEND           FRONTEND
        │                  │                  │
        ▼                  ▼          ┌───────┴────────┐
   Core Backend       Attendance +     │                │
                        Leave        MEMBER 3        MEMBER 4
                                     ADMIN           EMPLOYEE
Member	Ownership
👨‍💻 Member 1	Authentication, User, Employee, Payroll, Security, Core Backend
👨‍💻 Member 2	Attendance, Check-in/out, Leave Requests, Leave Approval
👨‍💻 Member 3	Admin / HR Frontend
👨‍💻 Member 4	Employee Frontend + API Integration

This separation reduces conflicts and allows each team member to work independently.

🟢 Development Status

Current repository status: SETUP

The Dayflow repository structure has been established and the complete application development workflow is organized.

Module	Status
📁 Repository Structure	🟢 SETUP
⚙️ Backend Structure	🟢 SETUP
⚛️ Frontend Structure	🟢 SETUP
🗄️ Database Structure	🟢 SETUP
🔐 Authentication Module	🟢 SETUP
👤 User Module	🟢 SETUP
👥 Employee Module	🟢 SETUP
🕐 Attendance Module	🟢 SETUP
📝 Leave Module	🟢 SETUP
💰 Payroll Module	🟢 SETUP
👨‍💼 Admin Frontend	🟢 SETUP
👤 Employee Frontend	🟢 SETUP
🔗 API Integration	🟢 SETUP
🧪 Testing Structure	🟢 SETUP
📚 Documentation	🟢 SETUP
Status Legend
🟢 SETUP
🟡 IN DEVELOPMENT
🔵 INTEGRATION
🧪 TESTING
✅ COMPLETED
🔄 Development Workflow
             ┌──────────────┐
             │    SETUP     │
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │   BACKEND    │
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │   FRONTEND   │
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │ API INTEGRATION│
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │   TESTING    │
             └──────┬───────┘
                    ▼
             ┌──────────────┐
             │ FINAL DEMO 🚀│
             └──────────────┘
🌐 API Communication

The frontend communicates with the Spring Boot backend through REST APIs.

React
  │
  │ Axios
  ▼
Spring Boot REST API
  │
  ▼
Service Layer
  │
  ▼
Repository Layer
  │
  ▼
MySQL

Frontend API services are organized by responsibility:

services/
│
├── api.js
├── authService.js
├── employeeService.js
├── attendanceService.js
├── leaveService.js
└── payrollService.js
🔐 Security

Dayflow follows security-oriented development practices.

JWT-based authentication
Role-based access control
Spring Security
Jakarta request validation
Protected application routes
Environment-based configuration
No hard-coded production credentials
No committed secrets

Never commit passwords, API keys, database credentials, JWT secrets, or .env files to GitHub.

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/KIRUBAKARAN2344/Dayflow-Human-Resource-Management-System.git
cd Dayflow-Human-Resource-Management-System
2. Backend Setup
cd backend

Build the backend:

mvn clean install

Run Spring Boot:

mvn spring-boot:run
3. Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the Vite development server:

npm run dev
4. Database

Create a MySQL database named:

CREATE DATABASE dayflow;

Configure your local database credentials using your local environment/configuration.

Do not commit real credentials to GitHub.

🔀 Git Workflow
main
│
├── feature/core-backend
│
├── feature/attendance-leave
│
├── feature/admin-frontend
│
└── feature/employee-frontend
Recommended workflow
git checkout -b feature/employee-frontend

git add .

git commit -m "feat: implement employee dashboard"

git push origin feature/employee-frontend

Changes should be reviewed before merging into main.

📸 Application Preview

Application screenshots and demo GIFs can be added here as the UI evolves.

Employee Experience
┌───────────────────────────────────────────┐
│              EMPLOYEE DASHBOARD           │
├────────────────┬──────────────────────────┤
│ Attendance     │ Leave                    │
│                │                          │
│   PRESENT      │   2 PENDING              │
├────────────────┴──────────────────────────┤
│                                           │
│       CHECK IN       CHECK OUT             │
│                                           │
├───────────────────────────────────────────┤
│ Recent Leave Requests                     │
│                                           │
│ PAID     AUG 25 - 27       PENDING        │
└───────────────────────────────────────────┘
Admin Experience
┌───────────────────────────────────────────┐
│                ADMIN DASHBOARD             │
├────────────┬────────────┬─────────────────┤
│ Employees  │ Attendance │ Leave Requests  │
│    42      │    38      │       4         │
├────────────┴────────────┴─────────────────┤
│                                           │
│          HR MANAGEMENT OVERVIEW            │
│                                           │
└───────────────────────────────────────────┘
🏆 Why Dayflow?
Before Dayflow
📊 Excel
📝 Paper
📧 Email
📁 Separate Records
       ↓
   HR Complexity
With Dayflow
              ⚡ DAYFLOW
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
   Employees   Attendance   Leave
       │          │          │
       └──────────┼──────────┘
                  ▼
               Payroll
                  │
                  ▼
            Better HR Flow

One system. One workflow. One source of truth.

🔮 Future Enhancements

Potential future improvements include:

🤖 AI-powered HR assistant
📊 Advanced HR analytics
📄 Automated payslip generation
📧 Email notifications
📱 Progressive Web App support
📈 Workforce insights
📁 Employee document management
🏢 Multi-organization support
🎯 Hackathon
Odoo × NMIT Bangalore Hackathon 2026

Dayflow is developed as a collaborative hackathon project with the goal of creating a practical, maintainable HR management platform.

Focus Areas
              DAYFLOW
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
   UX/UI       Backend     Database
      │          │          │
      └──────────┼──────────┘
                 ▼
          Real-world HRMS
Our Priorities
⚡ Fast development
🧩 Modular architecture
🔐 Secure application design
👥 Employee self-service
👨‍💼 HR management
🔗 Reliable API integration
🧪 Testing
🤝 Team collaboration
📌 Project Status

Dayflow is currently maintained as a hackathon project.

The repository is organized around a single Spring Boot backend, React/Vite frontend, and MySQL database with clearly separated ownership across the four-member development team.

📄 License

License: To be determined.
>>>>>>> origin/main
