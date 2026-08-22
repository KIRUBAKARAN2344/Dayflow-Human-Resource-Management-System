import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AdminRoutes from './AdminRoutes';
import Login from '../pages/auth/Login';

const AppRoutes = () => {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname === '/' ? '/admin/dashboard' : window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname === '/' ? '/admin/dashboard' : window.location.pathname;
      setCurrentPath(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newPath) => {
    const p = newPath === '/' ? '/admin/dashboard' : newPath;
    setCurrentPath(p);
    window.history.pushState({}, '', p);
  };

  return (
    <AuthProvider>
      {currentPath === '/login' ? (
        <Login onNavigate={navigateTo} />
      ) : (
        <ProtectedRoute onNavigate={navigateTo}>
          <AdminRoutes currentPath={currentPath} />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
};

export default AppRoutes;
