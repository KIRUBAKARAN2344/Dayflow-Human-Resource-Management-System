import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Calendar, DollarSign, LogIn, LogOut,
  ArrowRight, CheckCircle2, User
} from 'lucide-react';
import { attendanceService } from '../../services/attendanceService';
import { leaveService }      from '../../services/leaveService';
import { payrollService }    from '../../services/payrollService';
import { authService }       from '../../services/authService';
import LeaveStatus           from '../../components/employee/LeaveStatus';
import AttendanceCard        from '../../components/employee/AttendanceCard';

const EmployeeDashboard = () => {
  const [attendance, setAttendance]       = useState(null);
  const [leaves, setLeaves]               = useState([]);
  const [payroll, setPayroll]             = useState(null);
  const [loading, setLoading]             = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage]             = useState({ type: '', text: '' });
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
      setMessage({ type: 'danger', text: 'Failed to load dashboard data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

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

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Welcome back, {currentUser?.firstName || 'Employee'} 👋
          </h1>
          <p className="page-subtitle">Here's your work overview for today</p>
        </div>
        <button className="btn btn-outline" onClick={() => navigate('/employee/profile')}>
          <User size={16} /> View Profile
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      {/* Stat Cards */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card" onClick={() => navigate('/employee/attendance')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-card-label">Today's Status</span>
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
            <span className="stat-card-label">Pending Leaves</span>
            <Calendar size={18} style={{ color: 'var(--warning-text)' }} />
          </div>
          <div className="stat-card-value">{pendingCount}</div>
          <div className="stat-card-sub">
            {approvedCount} approved · {leaves.length} total
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/employee/payroll')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-card-label">Net Salary</span>
            <DollarSign size={18} style={{ color: 'var(--success-text)' }} />
          </div>
          <div className="stat-card-value">
            {payroll?.netSalary
              ? `₹${payroll.netSalary.toLocaleString('en-IN')}`
              : '₹35,000'}
          </div>
          <div className="stat-card-sub">
            {payroll?.paymentStatus || 'PAID'} · {payroll?.month || 'Current Month'}
          </div>
        </div>
      </div>

      {/* Attendance Check-In/Out Card */}
      <div style={{ marginBottom: '24px' }}>
        <AttendanceCard
          attendance={attendance}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          loading={actionLoading}
        />
      </div>

      {/* Recent Leave Requests */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>
              Recent Leave Requests
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Your last submitted requests
            </p>
          </div>
          <button
            className="btn btn-outline"
            style={{ fontSize: '13px', padding: '7px 14px' }}
            onClick={() => navigate('/employee/leave/history')}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '28px' }}>
            <div className="spinner" />
          </div>
        ) : leaves.length === 0 ? (
          <div className="empty-state">
            <Calendar size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p>No leave requests yet. Click "Apply Leave" to submit.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Start</th>
                  <th>End</th>
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
