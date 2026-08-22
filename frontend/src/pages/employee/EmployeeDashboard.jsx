import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Calendar, DollarSign, LogIn, LogOut,
  ArrowRight, User, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { attendanceService } from '../../services/attendanceService';
import { leaveService }      from '../../services/leaveService';
import { payrollService }    from '../../services/payrollService';
import { authService }       from '../../services/authService';
import LeaveStatus           from '../../components/employee/LeaveStatus';
import AttendanceCard        from '../../components/employee/AttendanceCard';

const TABS = ['Company Logo', 'Dashboard', 'Attendance', 'Time Off'];

const EmployeeDashboard = () => {
  const [attendance, setAttendance]       = useState(null);
  const [leaves, setLeaves]               = useState([]);
  const [payroll, setPayroll]             = useState(null);
  const [loading, setLoading]             = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage]             = useState({ type: '', text: '' });
  const [activeTab, setActiveTab]         = useState('Dashboard');
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [attData, leaveData, payData] = await Promise.all([
        attendanceService.getMyAttendance(currentUser?.id).catch(() => []),
        leaveService.getMyLeaves(currentUser?.id).catch(() => []),
        payrollService.getMyPayroll(currentUser?.id).catch(() => null),
      ]);
      const todayStr = new Date().toISOString().split('T')[0];
      const todayRec = Array.isArray(attData)
        ? attData.find((a) => a.date === todayStr) || attData[attData.length - 1]
        : null;
      setAttendance(todayRec || null);
      setLeaves(Array.isArray(leaveData) ? leaveData : []);
      setPayroll(payData);
    } catch {
      setMessage({ type: 'danger', text: 'Failed to load personal dashboard data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async () => {
    setActionLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const result = await attendanceService.checkIn(currentUser?.id);
      setAttendance(result);
      setMessage({ type: 'success', text: 'Checked in successfully!' });
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
      const result = await attendanceService.checkOut(currentUser?.id);
      setAttendance(result);
      setMessage({ type: 'success', text: 'Checked out successfully!' });
    } catch (err) {
      setMessage({ type: 'danger', text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const pendingCount  = leaves.filter((l) => l.status === 'PENDING').length;
  const approvedCount = leaves.filter((l) => l.status === 'APPROVED').length;
  const isCheckedIn   = !!attendance?.checkIn && !attendance?.checkOut;

  return (
    <div>
      {/* Top Odoo Tab Bar */}
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

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Welcome back, {currentUser?.firstName || 'Sarah'} {currentUser?.lastName || 'Jenkins'} 👋
          </h1>
          <p className="page-subtitle">Your personal employee portal & daily activity overview</p>
        </div>
        <button className="btn btn-outline" onClick={() => navigate('/employee/profile')}>
          <User size={16} /> View My Profile
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      {/* Personal Stat Overview Cards */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card" onClick={() => navigate('/employee/attendance')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-card-label">My Today's Attendance</span>
            <Clock size={18} style={{ color: 'var(--primary-400)' }} />
          </div>
          <div className="stat-card-value">
            {attendance?.checkIn ? (attendance?.checkOut ? 'Done' : 'Present') : 'Absent'}
          </div>
          <div className="stat-card-sub">
            {attendance?.checkIn
              ? `Check-in: ${attendance.checkIn}`
              : 'Not checked in yet'}
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/employee/leave/history')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-card-label">My Leave Status</span>
            <Calendar size={18} style={{ color: 'var(--warning-text)' }} />
          </div>
          <div className="stat-card-value">{pendingCount} Pending</div>
          <div className="stat-card-sub">
            {approvedCount} approved · {leaves.length} total submitted
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/employee/payroll')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-card-label">My Net Salary</span>
            <DollarSign size={18} style={{ color: 'var(--success-text)' }} />
          </div>
          <div className="stat-card-value">
            {payroll?.netSalary
              ? `₹${payroll.netSalary.toLocaleString('en-IN')}`
              : '₹50,000'}
          </div>
          <div className="stat-card-sub">
            {payroll?.paymentStatus || 'PAID'} · {payroll?.month || 'Current Month'}
          </div>
        </div>
      </div>

      {/* Daily Attendance Action Widget */}
      <div style={{ marginBottom: '24px' }}>
        <AttendanceCard
          attendance={attendance}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          loading={actionLoading}
        />
      </div>

      {/* Logged-In Employee Recent Leave Requests */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>
              My Recent Time Off Requests
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Only showing your submitted leave records
            </p>
          </div>
          <button
            className="btn btn-outline"
            style={{ fontSize: '13px', padding: '7px 14px' }}
            onClick={() => navigate('/employee/leave/history')}
          >
            View All My Leaves <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '28px' }}>
            <div className="spinner" />
          </div>
        ) : leaves.length === 0 ? (
          <div className="empty-state">
            <Calendar size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p>No leave requests submitted yet. Click below to apply.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: '12px' }}
              onClick={() => navigate('/employee/leave/apply')}
            >
              Apply Leave
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.slice(0, 5).map((l) => (
                  <tr key={l.id || Math.random()}>
                    <td><span className={`badge badge-${(l.leaveType||'paid').toLowerCase()}`}>{l.leaveType}</span></td>
                    <td>{l.startDate}</td>
                    <td>{l.endDate}</td>
                    <td>{l.reason || '—'}</td>
                    <td><LeaveStatus status={l.status} /></td>
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

export default EmployeeDashboard;
