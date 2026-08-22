import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User, Bell, Search, Clock, ChevronDown } from 'lucide-react';
import { authService } from '../../services/authService';
import { attendanceService } from '../../services/attendanceService';

/**
 * Employee Navbar — Systray avatar with live check-in status dot and attendance widget.
 * Used inside EmployeeLayout in App.jsx for /employee/* routes.
 */
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = authService.getCurrentUser();

  const fetchAttendance = async () => {
    try {
      const data = await attendanceService.getMyAttendance(user?.id);
      const records = Array.isArray(data) ? data : [];
      const todayStr = new Date().toISOString().split('T')[0];
      const todayRec = records.find((r) => r.date === todayStr) || records[records.length - 1];
      setAttendance(todayRec || null);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCheckedIn = !!attendance?.checkIn && !attendance?.checkOut;

  const handleCheckIn = async () => {
    setLoading(true);
    setMessage('');
    try {
      const result = await attendanceService.checkIn(user?.id);
      setAttendance(result);
      setMessage('Checked in successfully!');
    } catch (err) {
      setMessage(err.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    setMessage('');
    try {
      const result = await attendanceService.checkOut(user?.id);
      setAttendance(result);
      setMessage('Checked out successfully!');
    } catch (err) {
      setMessage(err.message || 'Check-out failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const initials = user?.firstName
    ? user.firstName.charAt(0) + (user.lastName ? user.lastName.charAt(0) : '')
    : 'E';

  return (
    <header className="navbar">
      {/* Left side: Search */}
      <div className="navbar-left">
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-light)',
            }}
          />
          <input
            type="text"
            placeholder="Search employees, departments..."
            style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px 8px 36px',
              fontSize: '13px',
              color: 'var(--text-main)',
              width: '260px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Right side: Notifications & Avatar with Systray Check-in */}
      <div className="navbar-right" style={{ position: 'relative' }} ref={dropdownRef}>
        <button
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <Bell size={16} />
        </button>

        {/* User Profile Avatar with Live Status Dot */}
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            background: dropdownOpen ? 'var(--bg-hover)' : 'transparent',
            transition: 'all 0.18s',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div className="navbar-avatar">{initials.toUpperCase()}</div>
            {/* Live status dot: Green if checked in, Red if not */}
            <span
              style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: isCheckedIn ? '#10b981' : '#ef4444',
                border: '2px solid var(--bg-surface, #ffffff)',
                boxShadow: isCheckedIn ? '0 0 8px #10b981' : '0 0 8px #ef4444',
              }}
              title={isCheckedIn ? 'Checked In (Present)' : 'Not Checked In / Absent'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Sarah Jenkins' : 'Sarah Jenkins'}
              <ChevronDown size={14} color="var(--text-light)" />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {user?.designation || 'Software Engineer'}
            </div>
          </div>
        </div>

        {/* Systray Dropdown Menu */}
        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '56px',
              right: '0',
              width: '280px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1000,
              padding: '16px',
              animation: 'fadeIn 0.15s ease-out',
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div
                style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: '800',
                }}
              >
                {initials.toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Sarah Jenkins' : 'Sarah Jenkins'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {user?.email || 'sarah.jenkins@dayflow.com'}
                </div>
              </div>
            </div>

            {/* Attendance Systray Box */}
            <div
              style={{
                margin: '14px 0',
                padding: '14px',
                background: 'var(--bg-surface, #f8fafc)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Attendance Systray
                </span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: isCheckedIn ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isCheckedIn ? '#10b981' : '#ef4444' }} />
                  {isCheckedIn ? 'Checked IN' : 'Checked OUT'}
                </span>
              </div>

              {isCheckedIn && (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--primary-400)" />
                  <span>Since {attendance?.checkIn || '09:00 AM'}</span>
                </div>
              )}

              {message && (
                <div style={{ fontSize: '11px', color: message.includes('success') ? '#34d399' : '#f87171', marginBottom: '8px' }}>
                  {message}
                </div>
              )}

              {!isCheckedIn ? (
                <button
                  className="btn btn-primary"
                  onClick={handleCheckIn}
                  disabled={loading}
                  style={{ width: '100%', padding: '10px', fontSize: '13px', display: 'flex', justifyContent: 'center', gap: '6px' }}
                >
                  <LogIn size={15} /> Check IN →
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={handleCheckOut}
                  disabled={loading}
                  style={{ width: '100%', padding: '10px', fontSize: '13px', display: 'flex', justifyContent: 'center', gap: '6px' }}
                >
                  <LogOut size={15} /> Check Out →
                </button>
              )}
            </div>

            {/* Menu Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={() => { setDropdownOpen(false); navigate('/employee/profile'); }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <User size={16} color="var(--primary-400)" />
                My Profile
              </button>

              <button
                onClick={() => { setDropdownOpen(false); handleLogout(); }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', color: 'var(--danger-text, #b91c1c)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
