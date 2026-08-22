import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Paperclip } from 'lucide-react';
import { leaveService }   from '../../services/leaveService';
import { authService }    from '../../services/authService';
import LeaveCalendar      from '../../components/employee/LeaveCalendar';
import LeaveStatus        from '../../components/employee/LeaveStatus';

// ─── Time Off Type Request Modal ────────────────────────────────────
const TimeOffModal = ({ onClose, onSubmit, loading }) => {
  const [form, setForm] = useState({
    leaveType:  'PAID',
    startDate:  '',
    endDate:    '',
    reason:     '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.endDate && form.startDate && form.endDate < form.startDate) {
      setError('End date cannot be before start date.');
      return;
    }
    onSubmit(form);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '480px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
            Time off Type Request
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Employee (read-only) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <label style={{ width: '130px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', flexShrink: 0 }}>
              Employee
            </label>
            <input
              type="text"
              className="form-control"
              value={authService.getCurrentUser()?.firstName ? `${authService.getCurrentUser().firstName} ${authService.getCurrentUser().lastName || ''}`.trim() : '[Employee]'}
              readOnly
              style={{ background: 'var(--bg-main)', cursor: 'default', flex: 1 }}
            />
          </div>

          {/* Time Off Type */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <label style={{ width: '130px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', flexShrink: 0 }}>
              Time off Type
            </label>
            <select
              name="leaveType"
              className="form-control"
              value={form.leaveType}
              onChange={handleChange}
              style={{ flex: 1 }}
            >
              <option value="PAID">Paid Time Off</option>
              <option value="SICK">Sick Leave</option>
              <option value="UNPAID">Unpaid Leaves</option>
            </select>
          </div>

          {/* Validity Period */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <label style={{ width: '130px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', flexShrink: 0 }}>
              Validity Period
            </label>
            <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={form.startDate}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', whiteSpace: 'nowrap' }}>To</span>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={form.endDate}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Reason */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
            <label style={{ width: '130px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', flexShrink: 0, paddingTop: '10px' }}>
              Reason
            </label>
            <textarea
              name="reason"
              className="form-control"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              placeholder="Optional reason..."
              style={{ flex: 1, resize: 'vertical' }}
            />
          </div>

          {/* Attachment hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <label style={{ width: '130px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', flexShrink: 0 }}>
              Attachments
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'rgba(139,92,246,0.12)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-400)',
                }}
              >
                <Paperclip size={14} />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                (For sick leave certificate)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ padding: '8px 20px' }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ padding: '8px 20px' }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Time Off Page ──────────────────────────────────────────────
const TABS = ['Company Logo', 'Employees', 'Attendance', 'Time Off'];

const ApplyLeave = () => {
  const [activeTab, setActiveTab] = useState('Time Off');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    leaveService.getMyLeaves(currentUser?.id)
      .then((data) => setLeaves(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Build list of approved leave dates for calendar
  const approvedLeaveDates = leaves
    .filter((l) => l.status === 'APPROVED')
    .flatMap((l) => {
      const dates = [];
      const start = new Date(l.startDate);
      const end   = new Date(l.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0]);
      }
      return dates;
    });

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setMessage({ type: '', text: '' });
    try {
      await leaveService.applyLeave({ ...formData, employeeId: currentUser?.id });
      setMessage({ type: 'success', text: 'Leave request submitted! Status: PENDING.' });
      setShowModal(false);
      // Refresh
      const data = await leaveService.getMyLeaves(currentUser?.id);
      setLeaves(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage({ type: 'danger', text: err.message || 'Failed to submit.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Leave type balance summary
  const paidDays   = 24; // default allocation
  const sickDays   = 7;
  const usedPaid   = leaves.filter((l) => l.leaveType === 'PAID'   && l.status === 'APPROVED').length;
  const usedSick   = leaves.filter((l) => l.leaveType === 'SICK'   && l.status === 'APPROVED').length;

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
              if (tab === 'Employees')  navigate('/employee/profile');
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

      {/* Alert */}
      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      {/* ── Time Off section ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1 className="page-title">Time Off</h1>
          <p className="page-subtitle">Manage and track your time off requests</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 24px', fontSize: '14px' }}
        >
          + NEW
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {/* Paid Time Off */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            borderTop: '3px solid var(--primary-500)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Paid time off
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-400)', lineHeight: 1 }}>
            {paidDays - usedPaid}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
            Days Available
          </div>
          <div style={{ height: '4px', background: 'var(--bg-hover)', borderRadius: '2px', marginTop: '12px' }}>
            <div style={{ width: `${Math.min((usedPaid / paidDays) * 100, 100)}%`, height: '100%', background: 'var(--primary-500)', borderRadius: '2px' }} />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>
            {usedPaid} used of {paidDays}
          </div>
        </div>

        {/* Sick Time Off */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            borderTop: '3px solid var(--success-text)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Sick time off
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--success-text)', lineHeight: 1 }}>
            {sickDays - usedSick < 0 ? 0 : sickDays - usedSick}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
            Days Available
          </div>
          <div style={{ height: '4px', background: 'var(--bg-hover)', borderRadius: '2px', marginTop: '12px' }}>
            <div style={{ width: `${Math.min((usedSick / sickDays) * 100, 100)}%`, height: '100%', background: 'var(--success-text)', borderRadius: '2px' }} />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>
            {usedSick} used of {sickDays}
          </div>
        </div>

        {/* Unpaid */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            borderTop: '3px solid var(--warning-text)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Unpaid Leaves
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--warning-text)', lineHeight: 1 }}>
            —
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
            No Allocation Limit
          </div>
        </div>
      </div>

      {/* Calendar + Sidebar layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {/* Calendar */}
        <div className="card" style={{ padding: '20px' }}>
          <LeaveCalendar leaveDates={approvedLeaveDates} />
        </div>

        {/* Sidebar – recent requests */}
        <div className="card" style={{ padding: '18px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            My Requests
          </h4>
          {leaves.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-light)', textAlign: 'center', padding: '24px 0' }}>
              No leave requests yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {leaves.slice(0, 8).map((l) => (
                <div
                  key={l.id || Math.random()}
                  style={{
                    padding: '10px 12px',
                    background: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>
                      {l.leaveType}
                    </span>
                    <LeaveStatus status={l.status} />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                    {l.startDate} → {l.endDate}
                  </div>
                  {l.reason && (
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {l.reason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <button
            className="btn btn-outline"
            style={{ width: '100%', marginTop: '14px', padding: '8px', fontSize: '12px' }}
            onClick={() => navigate('/employee/leave/history')}
          >
            View All History
          </button>
        </div>
      </div>

      {/* Note */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px 20px',
          background: 'rgba(139,92,246,0.07)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 'var(--radius-md)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: '1.7',
        }}
      >
        <strong style={{ color: 'var(--primary-400)' }}>Note:</strong> Employees can view only their own time off records, while Admins and HR Officers can view time off records &amp; approve/reject them for all employees.
        <br />
        <strong>TimeOff Types:</strong> Paid Time Off · Sick Leave · Unpaid Leaves
      </div>

      {/* Modal */}
      {showModal && (
        <TimeOffModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          loading={submitting}
        />
      )}
    </div>
  );
};

export default ApplyLeave;
