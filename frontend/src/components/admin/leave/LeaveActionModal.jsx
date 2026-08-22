import React, { useState } from 'react';
import Modal from '../../common/Modal';
import LeaveStatusBadge from './LeaveStatusBadge';

const LeaveActionModal = ({
  isOpen,
  onClose,
  record,
  mode, // 'view' | 'approve' | 'reject'
  onApproveConfirm,
  onRejectConfirm,
  isSubmitting,
}) => {
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState('');

  const handleClose = () => {
    setRejectReason('');
    setRejectError('');
    onClose();
  };

  const handleApprove = () => {
    onApproveConfirm(record.id);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setRejectError('A rejection reason is required before proceeding.');
      return;
    }
    setRejectError('');
    onRejectConfirm(record.id, rejectReason.trim());
    setRejectReason('');
  };

  if (!record) return null;

  const modalTitle =
    mode === 'approve'
      ? 'Approve Leave Request'
      : mode === 'reject'
      ? 'Reject Leave Request'
      : 'Leave Request Details';

  const leaveInitials = record.employeeName
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={modalTitle} maxWidth="580px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Employee Identity Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: record.avatarColor
                ? `linear-gradient(135deg, ${record.avatarColor} 0%, #171D38 100%)`
                : 'linear-gradient(135deg, var(--royal-indigo) 0%, var(--royal-violet) 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '16px',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            }}
          >
            {leaveInitials}
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>
              {record.employeeName}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              <span style={{ fontFamily: 'monospace', color: 'var(--royal-indigo)', fontWeight: '700' }}>{record.employeeId}</span> · {record.department}
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <LeaveStatusBadge status={record.status} />
          </div>
        </div>

        {/* Leave Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            { label: 'Leave Type', value: record.leaveType },
            { label: 'Total Duration', value: `${record.daysCount} Day(s)` },
            { label: 'From Date', value: record.startDate },
            { label: 'To Date', value: record.endDate },
            { label: 'Applied Date', value: record.appliedOn },
            { label: 'Current Status', value: record.status },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: '12px 14px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {label}
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Reason Block */}
        <div>
          <div style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
            Reason for Leave Request
          </div>
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '13.5px',
              color: 'var(--text-primary)',
              lineHeight: '1.5',
            }}
          >
            {record.reason || 'No specific reason provided.'}
          </div>
        </div>

        {/* Rejection Reason Input (if in Reject Mode) */}
        {mode === 'reject' && (
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--status-danger)', marginBottom: '6px' }}>
              Rejection Reason <span style={{ color: 'var(--status-danger)' }}>*</span>
            </label>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
                if (rejectError) setRejectError('');
              }}
              placeholder="State the administrative reason for rejecting this leave request..."
              className="nexus-input"
              style={{
                resize: 'vertical',
                borderColor: rejectError ? 'var(--status-danger)' : undefined,
              }}
            />
            {rejectError && (
              <span style={{ fontSize: '12px', color: 'var(--status-danger)', marginTop: '4px', display: 'block', fontWeight: '600' }}>
                {rejectError}
              </span>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="nexus-btn-secondary"
          >
            Cancel
          </button>

          {mode === 'approve' && (
            <button
              type="button"
              onClick={handleApprove}
              disabled={isSubmitting}
              className="nexus-btn-success"
              style={{
                padding: '9px 22px',
              }}
            >
              {isSubmitting ? 'Approving...' : '✓ Confirm Approval'}
            </button>
          )}

          {mode === 'reject' && (
            <button
              type="button"
              onClick={handleReject}
              disabled={isSubmitting}
              className="nexus-btn-danger"
              style={{
                padding: '9px 22px',
              }}
            >
              {isSubmitting ? 'Rejecting...' : '✕ Confirm Rejection'}
            </button>
          )}

          {mode === 'view' && (
            <button
              type="button"
              onClick={handleClose}
              className="nexus-btn-primary"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LeaveActionModal;
