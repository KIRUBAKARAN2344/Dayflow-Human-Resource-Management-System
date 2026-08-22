import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeService } from '../../services/employeeService';
import { authService } from '../../services/authService';
import ProfileCard from '../../components/employee/ProfileCard';

const TABS = ['Company Logo', 'Employees', 'Attendance', 'Time Off'];

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Employees');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const currentUser = authService.getCurrentUser();
        const data = await employeeService.getProfile(currentUser?.id);
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch employee profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      {/* Odoo-style top tab bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          marginBottom: '24px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          width: 'fit-content',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'Attendance') navigate('/employee/attendance');
              if (tab === 'Time Off')   navigate('/employee/leave/apply');
            }}
            style={{
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: tab === activeTab ? '700' : '500',
              color: tab === activeTab ? '#fff' : 'var(--text-muted)',
              background: tab === activeTab
                ? 'linear-gradient(135deg, var(--primary-500), var(--primary-700))'
                : 'transparent',
              border: 'none',
              borderRight: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.18s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab === 'Company Logo' ? (
              <span style={{ fontWeight: '800', letterSpacing: '-0.02em' }}>🌊 Dayflow</span>
            ) : (
              tab
            )}
          </button>
        ))}
      </div>

      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">View and manage your employment profile and confidential information</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Loading profile...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <ProfileCard profile={profile} />
      )}
    </div>
  );
};

export default Profile;
