import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { attendanceService } from '../../services/attendanceService';
import { authService } from '../../services/authService';
import AttendanceCard from '../../components/employee/AttendanceCard';

const TABS = ['Company Logo', 'Employees', 'Attendance', 'Time Off'];

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('Attendance');
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const data = await attendanceService.getMyAttendance(currentUser?.id);
      const records = Array.isArray(data) ? data : [];
      setHistory(records);

      const todayStr = new Date().toISOString().split('T')[0];
      const todayRec = records.find((r) => r.date === todayStr) || records[records.length - 1];
      setTodayAttendance(todayRec || null);
    } catch (err) {
      setMessage({ type: 'danger', text: err.message || 'Failed to load attendance records.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    setActionLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const updated = await attendanceService.checkIn(currentUser?.id);
      setMessage({ type: 'success', text: 'Checked in successfully!' });
      setTodayAttendance(updated);
      fetchAttendance();
    } catch (err) {
      setMessage({ type: 'danger', text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setActionLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const updated = await attendanceService.checkOut(currentUser?.id);
      setMessage({ type: 'success', text: 'Checked out successfully!' });
      setTodayAttendance(updated);
      fetchAttendance();
    } catch (err) {
      setMessage({ type: 'danger', text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

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
              if (tab === 'Employees') navigate('/employee/profile');
              if (tab === 'Time Off')  navigate('/employee/leave/apply');
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

      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance Tracking</h1>
          <p className="page-subtitle">Mark daily attendance and inspect attendance history</p>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div style={{ marginBottom: '28px' }}>
        <AttendanceCard
          attendance={todayAttendance}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          loading={actionLoading}
        />
      </div>

      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          Attendance History Log
        </h3>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '32px' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="empty-state">
            <p>No attendance records available. Check in to log your first attendance.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => (
                  <tr key={record.id || Math.random()}>
                    <td style={{ fontWeight: '600' }}>{record.date}</td>
                    <td>{record.checkIn || '--:--'}</td>
                    <td>{record.checkOut || '--:--'}</td>
                    <td>
                      <span className={`badge badge-${(record.status || 'ABSENT').toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
