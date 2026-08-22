import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Lock, Mail, ArrowRight } from 'lucide-react';
import { authService } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login(email, password);
      navigate('/employee/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundImage: `radial-gradient(ellipse at 60% 30%, rgba(124, 58, 237, 0.06) 0%, transparent 60%),
                          radial-gradient(ellipse at 20% 80%, rgba(124, 58, 237, 0.04) 0%, transparent 50%)`,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          padding: '40px 36px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--primary-600), var(--primary-700))',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              marginBottom: '16px',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
            }}
          >
            <Layers size={30} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
            Dayflow HRMS
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Sign in to your Employee Portal
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-control"
                style={{ paddingLeft: '40px' }}
                placeholder="employee@dayflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail
                size={17}
                style={{
                  position: 'absolute',
                  left: '13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-control"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock
                size={17}
                style={{
                  position: 'absolute',
                  left: '13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '13px', fontSize: '15px', marginTop: '8px' }}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ width: '16px', height: '16px' }} />
                Signing in...
              </>
            ) : (
              <>
                Sign In <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
