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

// ── Admin Layout Wrapper ──────────────────────────────────────────────────────
const AdminLayoutWrapper = ({ children }) => {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (newPath) => {
    setPath(newPath);
    window.history.pushState({}, '', newPath);
  };

  return (
    <AdminLayout currentPath={path} onNavigate={navigateTo}>
      {children(navigateTo)}
    </AdminLayout>
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
          <Route
            path="/admin/employees/:empId"
            element={
              <AdminLayoutWrapper>
                {(nav) => {
                  const empId = window.location.pathname.replace('/admin/employees/', '');
                  return <EmployeeDetails employeeId={empId} onNavigate={nav} />;
                }}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin/employees"
            element={
              <AdminLayoutWrapper>
                {(nav) => <Employees onNavigate={nav} />}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin/attendance/employee"
            element={
              <AdminLayoutWrapper>
                {(nav) => <EmployeeAttendance onNavigate={nav} />}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <AdminLayoutWrapper>
                {(nav) => <AdminAttendance onNavigate={nav} />}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin/leave-requests"
            element={
              <AdminLayoutWrapper>
                {(nav) => <LeaveRequests onNavigate={nav} />}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin/leave"
            element={
              <AdminLayoutWrapper>
                {(nav) => <LeaveRequests onNavigate={nav} />}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin/payroll"
            element={
              <AdminLayoutWrapper>
                {(nav) => <AdminPayroll onNavigate={nav} />}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayoutWrapper>
                {(nav) => <AdminDashboard onNavigate={nav} />}
              </AdminLayoutWrapper>
            }
          />
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* ── Default redirect ──────────────────────────────────── */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
