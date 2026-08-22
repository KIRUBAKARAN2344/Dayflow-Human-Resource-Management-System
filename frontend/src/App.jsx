import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Menu, X } from 'lucide-react';

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

// ── Employee Layout Wrapper with Mobile Sidebar Toggle ───────────────────────
const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClick = (e) => {
      if (e.target.closest('.sidebar') || e.target.closest('.sidebar-toggle-btn')) return;
      setSidebarOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [sidebarOpen]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)', position: 'relative' }}>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 199,
            display: 'none',
          }}
          className="sidebar-backdrop"
        />
      )}

      {/* Sidebar — passes open state for mobile */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Navbar — passes toggle handler for hamburger button */}
        <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

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
