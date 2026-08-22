import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import SignUpForm from '../../components/auth/SignUpForm';
import { ShieldIcon, UserIcon } from '../../components/common/Icons';

const Login = ({ onNavigate }) => {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [activeRole, setActiveRole] = useState('Admin'); // 'Admin' | 'Employee'
  
  let navigate = null;
  try {
    navigate = useNavigate();
  } catch (e) {
    // Graceful fallback if outside router context
  }

  const handleSuccess = (role) => {
    const targetPath = role === 'Employee' ? '/employee/dashboard' : '/admin/dashboard';
    if (navigate) {
      navigate(targetPath);
    } else if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const isAdmin = activeRole === 'Admin';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#090D1A',
        backgroundImage: `
          radial-gradient(circle at 50% 10%, rgba(147, 51, 234, 0.18) 0%, transparent 60%),
          radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.08) 0%, transparent 40%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Top Header Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#FFFFFF', margin: 0, letterSpacing: '0.04em' }}>
          {authMode === 'signup'
            ? 'Sign Up Page'
            : isAdmin
            ? 'Admin Sign In'
            : 'Employee Sign In'}
        </h2>
      </div>

      {/* Main Form Card (Matches Wireframe Image Format) */}
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: authMode === 'signin' ? '430px' : '490px',
          backgroundColor: '#0F1426',
          borderRadius: '16px',
          padding: '32px 28px',
          border: '1px solid #232B45',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(168, 85, 247, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* App/Web Logo Header Container */}
        <div
          style={{
            margin: '0 auto',
            padding: '10px 24px',
            backgroundColor: '#1E2640',
            borderRadius: '12px',
            border: '1px solid #2D3759',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
            fontWeight: '700',
            fontSize: '13.5px',
            letterSpacing: '0.04em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {isAdmin ? (
            <ShieldIcon size={18} style={{ color: '#C084FC' }} />
          ) : (
            <UserIcon size={18} style={{ color: '#38BDF8' }} />
          )}
          <span>Dayflow HRMS</span>
        </div>

        {/* Role Switcher Pill Bar (Only on Sign In view) */}
        {authMode === 'signin' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              backgroundColor: '#13182C',
              padding: '4px',
              borderRadius: '24px',
              border: '1px solid #232B45',
              gap: '4px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveRole('Admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: isAdmin ? '#C084FC' : 'transparent',
                backgroundImage: isAdmin
                  ? 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)'
                  : 'none',
                color: isAdmin ? '#FFFFFF' : '#94A3B8',
                fontWeight: isAdmin ? '800' : '600',
                fontSize: '12.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <ShieldIcon size={14} />
              <span>Admin Login</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole('Employee')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: !isAdmin ? '#C084FC' : 'transparent',
                backgroundImage: !isAdmin
                  ? 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)'
                  : 'none',
                color: !isAdmin ? '#FFFFFF' : '#94A3B8',
                fontWeight: !isAdmin ? '800' : '600',
                fontSize: '12.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <UserIcon size={14} />
              <span>Employee Login</span>
            </button>
          </div>
        )}

        {/* Dynamic Form Render: Sign In vs Sign Up */}
        {authMode === 'signin' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignUp={() => setAuthMode('signup')}
            activeRole={activeRole}
          />
        ) : (
          <SignUpForm
            onSwitchToSignIn={() => setAuthMode('signin')}
            onSuccess={handleSuccess}
          />
        )}
      </div>

      {/* Wireframe Specification System Explanations & Notes Box */}
      <div
        style={{
          marginTop: '32px',
          width: '100%',
          maxWidth: '740px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
          fontSize: '12.5px',
          color: '#94A3B8',
        }}
      >
        {/* Box 1: Login ID Auto-Generation Format */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(15, 20, 38, 0.7)',
            borderRadius: '12px',
            border: '1px solid #1E293B',
            lineHeight: '1.5',
          }}
        >
          <div style={{ color: '#E2E8F0', fontWeight: '700', marginBottom: '6px' }}>
            ⚡ System Login ID Generation Format:
          </div>
          <div>
            <code>[Company Initials]</code> + <code>[First 2 letters of First & Last Name]</code> + <code>[Year of Joining]</code> + <code>[Serial No.]</code>
          </div>
          <div style={{ marginTop: '6px', color: '#C084FC', fontFamily: 'monospace' }}>
            Example: OIJODO20220001 (Odoo India + John Doe + 2022 + 0001)
          </div>
        </div>

        {/* Box 2: Security & Registration Notes */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(15, 20, 38, 0.7)',
            borderRadius: '12px',
            border: '1px solid #1E293B',
            lineHeight: '1.5',
          }}
        >
          <div style={{ color: '#E2E8F0', fontWeight: '700', marginBottom: '6px' }}>
            📌 System Access Notes:
          </div>
          <div>• Normal users cannot register directly. Admin/HR creates employee profiles.</div>
          <div>• First-time login credentials use auto-generated ID & temporary password.</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
