# Dayflow HRMS — API Contract & Module Ownership

## Module Ownership

### Member 1: Core Backend & Security
- **Authentication**: `POST /api/auth/login`, `POST /api/auth/register`
- **User Management**: `com.dayflow.user`
- **Employee Management**: `com.dayflow.employee`
- **Payroll Management**: `com.dayflow.payroll`
- **Security & Config**: JWT Authentication Filter, Spring Security, Global Exception Handling

### Member 2: Attendance & Leave Backend
- **Attendance**: `POST /api/attendance/check-in`, `POST /api/attendance/check-out`, `GET /api/attendance/me`
- **Leave Management**: `POST /api/leaves`, `GET /api/leaves/me`, `GET /api/leaves`, `PUT /api/leaves/{id}/approve`, `PUT /api/leaves/{id}/reject`
- References `Employee.id` (`Long`) as the primary foreign key identifier.

### Member 3: Admin / HR Frontend
- **Location**: `frontend/src/pages/admin/` & `frontend/src/components/admin/`
- Admin Login, Admin Dashboard, Employee Management, Attendance Monitoring, Leave Approvals, Payroll Management

### Member 4: Employee Frontend & Integration
- **Location**: `frontend/src/pages/employee/` & `frontend/src/components/employee/`
- Employee Dashboard, My Profile, Attendance (Check-in/Check-out), Apply Leave, Leave History, Payslip Viewing

---

## Entity Relationship Contract
```text
User (id, email, password, role)
  └── Employee (id, employeeId, name, department, designation, joiningDate, phone, ...)
        ├── Attendance (id, employeeId, date, checkIn, checkOut, status)
        ├── LeaveRequest (id, employeeId, leaveType, startDate, endDate, status, reason)
        └── Payroll (id, employeeId, month, basicSalary, allowances, deductions, netSalary, status)
```
