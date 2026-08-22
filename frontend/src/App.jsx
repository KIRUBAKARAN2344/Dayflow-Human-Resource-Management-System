import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// ── Shared Auth ──────────────────────────────────────────────────────────────
import Login from './pages/auth/Login';

// ── Employee Layout & Pages (Member 4) ───────────────────────────────────────
import Navbar   from './components/common/Navbar';
import Sidebar  from './components/common/Sidebar';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import Profile           from './pages/employee/Profile';
import Attendance        from './pages/employee/Attendance';
import ApplyLeave        from './pages/employee/ApplyLeave';
import LeaveHistory      from './pages/employee/LeaveHistory';
import Payroll           from './pages/employee/Payroll';

// ── Admin Layout & Pages (Member 3) ─────────────────────────────────────────
import AdminLayout        from './components/admin/AdminLayout';
import AdminDashboard     from './pages/admin/AdminDashboard';
import Employees          from './pages/admin/Employees';
import EmployeeDetails    from './pages/admin/EmployeeDetails';
import AdminAttendance    from './pages/admin/Attendance';
import EmployeeAttendance from './pages/admin/EmployeeAttendance';
import LeaveRequests      from './pages/admin/LeaveRequests';
import AdminPayroll       from './pages/admin/Payroll';

// ── Employee Layout Wrapper ───────────────────────────────────────────────────
const EmployeeLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <Navbar />
      <main className="page-body">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ── Auth ──────────────────────────────────────────────── */}
          <Route path="/login" element={<Login />} />

          {/* ── Employee Portal (Member 4) ────────────────────────── */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<Navigate to="/employee/dashboard" replace />} />
            <Route path="dashboard"     element={<EmployeeDashboard />} />
            <Route path="profile"       element={<Profile />} />
            <Route path="attendance"    element={<Attendance />} />
            <Route path="leave/apply"   element={<ApplyLeave />} />
            <Route path="leave/history" element={<LeaveHistory />} />
            <Route path="payroll"       element={<Payroll />} />
          </Route>

          {/* ── Admin Portal (Member 3) ───────────────────────────── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/:empId" element={<EmployeeDetails />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="attendance/employee" element={<EmployeeAttendance />} />
            <Route path="leave-requests" element={<LeaveRequests />} />
            <Route path="leave" element={<LeaveRequests />} />
            <Route path="payroll" element={<AdminPayroll />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* ── Default redirect ──────────────────────────────────── */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
