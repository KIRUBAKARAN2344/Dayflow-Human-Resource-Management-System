import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar   from './components/common/Navbar';
import Sidebar  from './components/common/Sidebar';

import Login             from './pages/auth/Login';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import Profile           from './pages/employee/Profile';
import Attendance        from './pages/employee/Attendance';
import ApplyLeave        from './pages/employee/ApplyLeave';
import LeaveHistory      from './pages/employee/LeaveHistory';
import Payroll           from './pages/employee/Payroll';

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
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Navigate to="/employee/dashboard" replace />} />
          <Route path="dashboard"     element={<EmployeeDashboard />} />
          <Route path="profile"       element={<Profile />} />
          <Route path="attendance"    element={<Attendance />} />
          <Route path="leave/apply"   element={<ApplyLeave />} />
          <Route path="leave/history" element={<LeaveHistory />} />
          <Route path="payroll"       element={<Payroll />} />
        </Route>

        <Route path="*" element={<Navigate to="/employee/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
