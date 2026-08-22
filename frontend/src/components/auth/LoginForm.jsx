import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSuccess, onSwitchToSignUp, activeRole = 'Admin' }) => {
  const { login } = useAuth();
  
  const isAdmin = activeRole === 'Admin';

  const [loginId, setLoginId] = useState(
    isAdmin ? 'admin@dayflow.com' : 'employee@dayflow.com'
  );
  const [password, setPassword] = useState(
    isAdmin ? 'admin123' : 'emp123'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default credentials when switching between Admin and Employee roles
  useEffect(() => {
    if (isAdmin) {
      setLoginId('admin@dayflow.com');
      setPassword('admin123');
    } else {
      setLoginId('employee@dayflow.com');
      setPassword('emp123');
    }
    setError('');
  }, [activeRole, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginId.trim() || !password.trim()) {
      setError('Please enter both Login ID/Email and Password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await login({ email: loginId, password, role: activeRole });
      if (onSuccess) {
        onSuccess(activeRole);
      }
    } catch (err) {
      setError(err.message || 'Invalid Login ID or Password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Error Banner */}
      {error && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#F87171',
            fontSize: '12.5px',
            fontWeight: '600',
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Login Id/Email :- Field */}
      <div>
        <label style={{ display: 'block', fontSize: '13.5px', color: '#E2E8F0', marginBottom: '8px', fontWeight: '500' }}>
          {isAdmin ? 'Admin Login Id/Email :-' : 'Employee Login Id/Email :-'}
        </label>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder={isAdmin ? 'admin@dayflow.com' : 'e.g. OIJODO20220001 or employee@dayflow.com'}
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '12px 14px',
            backgroundColor: '#13182C',
            border: '1px solid #2A3353',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#C084FC')}
          onBlur={(e) => (e.target.style.borderColor = '#2A3353')}
        />
      </div>

      {/* Password :- Field */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ fontSize: '13.5px', color: '#E2E8F0', fontWeight: '500' }}>
            Password :-
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#C084FC',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 42px 12px 14px',
              backgroundColor: '#13182C',
              border: '1px solid #2A3353',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#C084FC')}
            onBlur={(e) => (e.target.style.borderColor = '#2A3353')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '4px',
            }}
          >
            {showPassword ? '👁' : '👁‍🗨'}
          </button>
        </div>
      </div>

      {/* Demo Helper Pill */}
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: 'rgba(192, 132, 252, 0.08)',
          border: '1px dashed rgba(192, 132, 252, 0.25)',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#D8B4FE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        <span style={{ fontWeight: '600' }}>Demo {isAdmin ? 'Admin' : 'Employee'}:</span>
        <button
          type="button"
          onClick={() => {
            if (isAdmin) {
              setLoginId('admin@dayflow.com');
              setPassword('admin123');
            } else {
              setLoginId('employee@dayflow.com');
              setPassword('emp123');
            }
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#F3E8FF',
            fontSize: '11.5px',
            fontFamily: 'monospace',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {isAdmin ? 'admin@dayflow.com / admin123' : 'employee@dayflow.com / emp123'}
        </button>
      </div>

      {/* SIGN IN Button (Purple Wireframe Style) */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          marginTop: '6px',
          padding: '13px 20px',
          borderRadius: '24px',
          backgroundColor: '#C084FC',
          backgroundImage: 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '800',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 14px rgba(147, 51, 234, 0.45)',
          transition: 'all 0.2s ease',
        }}
      >
        {isSubmitting
          ? 'Authenticating...'
          : isAdmin
          ? 'ADMIN SIGN IN'
          : 'EMPLOYEE SIGN IN'}
      </button>

      {/* Don't have an account? Sign Up Link */}
      <div style={{ textAlign: 'center', marginTop: '6px' }}>
        <button
          type="button"
          onClick={onSwitchToSignUp}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#E2E8F0',
            fontSize: '13px',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#E2E8F0')}
        >
          Don't have an Account? <strong style={{ color: '#C084FC' }}>Sign Up</strong>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
