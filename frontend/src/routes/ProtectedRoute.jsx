import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import Loading from '../components/common/Loading';

const ProtectedRoute = ({ children, onNavigate }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading message="Authenticating administrator session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onNavigate={onNavigate} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
