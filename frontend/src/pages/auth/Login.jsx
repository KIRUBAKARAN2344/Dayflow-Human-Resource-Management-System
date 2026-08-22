import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { ShieldIcon } from '../../components/common/Icons';

const Login = ({ onNavigate }) => {
  const handleSuccess = () => {
    if (onNavigate) {
      onNavigate('/admin/dashboard');
    } else {
      window.history.pushState({}, '', '/admin/dashboard');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--navy-deep)',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #171D38 0%, #0B1020 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid var(--champagne-gold)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'var(--navy-deep)',
              border: '2px solid var(--champagne-gold)',
              boxShadow: '0 0 16px var(--champagne-gold-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--champagne-gold)',
              margin: '0 auto 16px auto',
            }}
          >
            <ShieldIcon size={28} />
          </div>

          <h1
            style={{
              fontSize: '22px',
              fontWeight: '800',
              color: 'var(--navy-deep)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            DAYFLOW HRMS
          </h1>

          <div
            style={{
              fontSize: '11.5px',
              fontWeight: '700',
              color: 'var(--champagne-gold)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}
          >
            Royal HR Executive Console
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', margin: '8px 0 0 0' }}>
            Sign in with your administrator credentials
          </p>
        </div>

        {/* Login Form */}
        <LoginForm onSuccess={handleSuccess} />

        {/* Footer info */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          Dayflow Human Resource Management System · Admin Portal
        </div>
      </div>
    </div>
  );
};

export default Login;
