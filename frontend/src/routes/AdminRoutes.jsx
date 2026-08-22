import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Employees from '../pages/admin/Employees';
import EmployeeDetails from '../pages/admin/EmployeeDetails';
import Attendance from '../pages/admin/Attendance';
import EmployeeAttendance from '../pages/admin/EmployeeAttendance';
import LeaveRequests from '../pages/admin/LeaveRequests';
import Payroll from '../pages/admin/Payroll';

const AdminRoutes = ({ currentPath: initialPath }) => {
  const [path, setPath] = useState(initialPath || window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (newPath) => {
    setPath(newPath);
    window.history.pushState({}, '', newPath);
  };

  const renderPageComponent = () => {
    if (path.startsWith('/admin/employees/') && path !== '/admin/employees') {
      const empId = path.replace('/admin/employees/', '');
      return <EmployeeDetails employeeId={empId} onNavigate={navigateTo} />;
    }

    switch (path) {
      case '/admin/employees':
        return <Employees onNavigate={navigateTo} />;
      case '/admin/attendance':
        return <Attendance onNavigate={navigateTo} />;
      case '/admin/attendance/employee':
        return <EmployeeAttendance onNavigate={navigateTo} />;
      case '/admin/leave-requests':
      case '/admin/leave':
        return <LeaveRequests onNavigate={navigateTo} />;
      case '/admin/payroll':
        return <Payroll onNavigate={navigateTo} />;
      case '/admin/dashboard':
      case '/admin':
      default:
        return <AdminDashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <AdminLayout currentPath={path} onNavigate={navigateTo}>
      {renderPageComponent()}
    </AdminLayout>
  );
};

export default AdminRoutes;
