import React, { useState } from 'react';
import { generateLoginId } from '../../utils/idGenerator';

const SignUpForm = ({ onSwitchToSignIn, onSuccess }) => {
  const [companyName, setCompanyName] = useState('Odoo India');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logoFileName, setLogoFileName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate preview of Login ID dynamically as user types
  const previewLoginId = generateLoginId(
    companyName || 'Odoo India',
    name || 'John Doe',
    new Date().getFullYear(),
    1
  );

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName.trim() || !name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Account created successfully! Your generated Login ID is: ${previewLoginId}`);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        else if (onSwitchToSignIn) onSwitchToSignIn();
      }, 2000);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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

      {successMessage && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34D399',
            fontSize: '12.5px',
            fontWeight: '600',
          }}
        >
          ✓ {successMessage}
        </div>
      )}

      {/* Company Name + Upload Logo */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', color: '#E2E8F0', marginBottom: '6px', fontWeight: '500' }}>
          Company Name :-
        </label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Odoo India"
            required
            style={{
              flex: 1,
              padding: '10px 14px',
              backgroundColor: '#13182C',
              border: '1px solid #2A3353',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13.5px',
              outline: 'none',
            }}
          />
          <label
            title="Upload Logo"
            style={{
              padding: '10px 14px',
              backgroundColor: '#1E293B',
              border: '1px solid #38BDF8',
              borderRadius: '8px',
              color: '#38BDF8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              gap: '4px',
            }}
          >
            <span>⬆</span>
            <span style={{ fontSize: '11.5px' }}>{logoFileName ? 'Uploaded' : 'Logo'}</span>
            <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Name */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', color: '#E2E8F0', marginBottom: '6px', fontWeight: '500' }}>
          Name :-
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. John Doe"
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 14px',
            backgroundColor: '#13182C',
            border: '1px solid #2A3353',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '13.5px',
            outline: 'none',
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', color: '#E2E8F0', marginBottom: '6px', fontWeight: '500' }}>
          Email :-
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. john.doe@odoo.com"
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 14px',
            backgroundColor: '#13182C',
            border: '1px solid #2A3353',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '13.5px',
            outline: 'none',
          }}
        />
      </div>

      {/* Phone */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', color: '#E2E8F0', marginBottom: '6px', fontWeight: '500' }}>
          Phone :-
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. +91 98765 43210"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 14px',
            backgroundColor: '#13182C',
            border: '1px solid #2A3353',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '13.5px',
            outline: 'none',
          }}
        />
      </div>

      {/* Password */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', color: '#E2E8F0', marginBottom: '6px', fontWeight: '500' }}>
          Password :-
        </label>
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
              padding: '10px 42px 10px 14px',
              backgroundColor: '#13182C',
              border: '1px solid #2A3353',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13.5px',
              outline: 'none',
            }}
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

      {/* Confirm Password */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', color: '#E2E8F0', marginBottom: '6px', fontWeight: '500' }}>
          Confirm Password :-
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '10px 42px 10px 14px',
              backgroundColor: '#13182C',
              border: '1px solid #2A3353',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13.5px',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            {showConfirmPassword ? '👁' : '👁‍🗨'}
          </button>
        </div>
      </div>

      {/* Login ID Generation Preview Banner */}
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          border: '1px dashed rgba(168, 85, 247, 0.3)',
          borderRadius: '8px',
          fontSize: '11.5px',
          color: '#D8B4FE',
        }}
      >
        <span style={{ fontWeight: '700' }}>Auto-Generated ID: </span>
        <strong style={{ color: '#F3E8FF', fontFamily: 'monospace', fontSize: '12px' }}>{previewLoginId}</strong>
      </div>

      {/* Sign Up Button (Purple wireframe style) */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          marginTop: '6px',
          padding: '12px 20px',
          borderRadius: '24px',
          backgroundColor: '#C084FC',
          backgroundImage: 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '700',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 14px rgba(147, 51, 234, 0.4)',
          transition: 'all 0.2s ease',
        }}
      >
        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
      </button>

      {/* Already have an account link */}
      <div style={{ textAlign: 'center', marginTop: '6px' }}>
        <button
          type="button"
          onClick={onSwitchToSignIn}
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
          Already have an account ? <strong style={{ color: '#C084FC' }}>Sign In</strong>
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
