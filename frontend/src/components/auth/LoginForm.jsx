import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldIcon } from '../common/Icons';

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@dayflow.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await login({ email, password });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'var(--status-danger-bg)',
            border: '1px solid rgba(201, 76, 76, 0.25)',
            color: 'var(--status-danger)',
            fontSize: '12.5px',
            fontWeight: '600',
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Email Input */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Admin Work Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@dayflow.com"
          required
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-main)',
            fontSize: '14px',
            color: 'var(--text-primary)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--champagne-gold)';
            e.target.style.boxShadow = '0 0 0 3px var(--champagne-gold-light)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-light)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Password Input */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-main)',
            fontSize: '14px',
            color: 'var(--text-primary)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--champagne-gold)';
            e.target.style.boxShadow = '0 0 0 3px var(--champagne-gold-light)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-light)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Demo Credentials Box */}
      <div
        style={{
          padding: '10px 12px',
          backgroundColor: 'rgba(201, 162, 39, 0.08)',
          border: '1px solid rgba(201, 162, 39, 0.25)',
          borderRadius: '8px',
          fontSize: '12px',
          color: 'var(--navy-deep)',
        }}
      >
        <span style={{ fontWeight: '700' }}>Demo Admin Login:</span> admin@dayflow.com / admin123
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          marginTop: '6px',
          padding: '13px 20px',
          borderRadius: '8px',
          border: '1px solid var(--champagne-gold)',
          backgroundColor: 'var(--navy-deep)',
          color: 'var(--champagne-gold)',
          fontSize: '14px',
          fontWeight: '700',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all var(--transition-fast)',
          opacity: isSubmitting ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--royal-indigo)';
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--navy-deep)';
        }}
      >
        {isSubmitting ? 'Authenticating...' : 'Sign In to Executive Console'}
      </button>
    </form>
  );
};

export default LoginForm;
