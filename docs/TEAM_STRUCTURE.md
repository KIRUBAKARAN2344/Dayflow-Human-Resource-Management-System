# Dayflow HRMS — Team Responsibilities & Package Ownership

## Overview
Dayflow Human Resource Management System is a collaborative 4-member hackathon project.

---

## 1. Member Responsibilities & Package Mapping

### Member 1: Core Backend & Security
- **Packages**:
  - `com.dayflow.auth`
  - `com.dayflow.user`
  - `com.dayflow.employee`
  - `com.dayflow.payroll`
  - `com.dayflow.security`
  - `com.dayflow.exception`
  - `com.dayflow.config`
- **Scope**:
  - User authentication & JWT configuration
  - Employee master entity & CRUD
  - Payroll calculation & disbursal entities
  - Global exception handler & CORS configuration

### Member 2: Attendance & Leave Management (Backend)
- **Packages**:
  - `com.dayflow.attendance`
  - `com.dayflow.leave`
- **Scope**:
  - Attendance check-in / check-out records and daily status
  - Leave requests, status tracking, and admin approval workflows
  - References `Employee.id` (`Long`) for relational integrity

### Member 3: Admin / HR Frontend
- **Packages**:
  - `frontend/src/pages/admin/`
  - `frontend/src/components/admin/`
- **Scope**:
  - Admin login & executive dashboard
  - Employee directory & profile management UI
  - Real-time attendance monitoring console
  - Leave request review & approval system
  - Payroll calculation & payslip management console

### Member 4: Employee Frontend & Integration
- **Packages**:
  - `frontend/src/pages/employee/`
  - `frontend/src/components/employee/`
- **Scope**:
  - Employee personal dashboard
  - Employee profile & contact view
  - Attendance punch-in/out widget & history
  - Time-off application & request history
  - Personal payslip view & PDF download

---

## 2. Shared Frontend Infrastructure
- **Common Components**: `frontend/src/components/common/` (`Navbar`, `Sidebar`, `Modal`, `Button`, `Badge`, `Loading`, `ErrorMessage`, `ConfirmDialog`)
- **API Services**: `frontend/src/services/` (`api.js`, `authService.js`, `employeeService.js`, `attendanceService.js`, `leaveService.js`, `payrollService.js`)
- **State Hooks**: `frontend/src/hooks/`
- **Utilities**: `frontend/src/utils/`
