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
            padding: '14px',
            backgroundColor: 'var(--bg-main)',
            borderRadius: '10px',
            border: '1px solid var(--border-light)',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: record.avatarColor || 'var(--royal-indigo)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '16px',
              flexShrink: 0,
            }}
          >
            {leaveInitials}
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>
              {record.employeeName}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {record.employeeId} · {record.department}
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
            { label: 'Days Requested', value: `${record.days} day${record.days !== 1 ? 's' : ''}` },
            { label: 'Start Date', value: record.startDate },
            { label: 'End Date', value: record.endDate },
            { label: 'Applied On', value: record.appliedOn },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Leave Reason */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            Employee Reason
          </div>
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-main)',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              fontSize: '13.5px',
              color: 'var(--text-primary)',
              lineHeight: '1.5',
              fontStyle: 'italic',
            }}
          >
            "{record.reason}"
          </div>
        </div>

        {/* Leave Balance (if available) */}
        {record.leaveBalance && (
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Leave Balance
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {Object.entries(record.leaveBalance).map(([type, days]) => (
                <div
                  key={type}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    textTransform: 'capitalize',
                  }}
                >
                  {type}: <span style={{ color: 'var(--champagne-gold)' }}>{days}d</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Remarks (already set) */}
        {record.adminRemarks && mode === 'view' && (
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Admin Remarks
            </div>
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: record.status === 'Approved' ? 'var(--status-success-bg)' : 'var(--status-danger-bg)',
                borderRadius: '8px',
                border: `1px solid ${record.status === 'Approved' ? 'rgba(22,134,106,0.2)' : 'rgba(201,76,76,0.2)'}`,
                fontSize: '13px',
                color: record.status === 'Approved' ? 'var(--status-success)' : 'var(--status-danger)',
                fontWeight: '600',
              }}
            >
              {record.adminRemarks}
            </div>
          </div>
        )}

        {/* Approve Confirmation */}
        {mode === 'approve' && (
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--status-success-bg)',
              borderRadius: '10px',
              border: '1px solid rgba(22,134,106,0.2)',
              fontSize: '13.5px',
              color: 'var(--status-success)',
              fontWeight: '600',
            }}
          >
            ✓ You are about to <strong>approve</strong> this leave request. The employee will be notified.
          </div>
        )}

        {/* Reject Reason Input */}
        {mode === 'reject' && (
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Rejection Reason <span style={{ color: 'var(--status-danger)' }}>*</span>
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
                if (e.target.value.trim()) setRejectError('');
              }}
              placeholder="Provide a clear reason for rejecting this leave request..."
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1px solid ${rejectError ? 'var(--status-danger)' : 'var(--border-light)'}`,
                fontSize: '13.5px',
                resize: 'vertical',
                outline: 'none',
                backgroundColor: 'var(--bg-main)',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => { if (!rejectError) e.target.style.borderColor = 'var(--champagne-gold)'; }}
              onBlur={(e) => { if (!rejectError) e.target.style.borderColor = 'var(--border-light)'; }}
            />
            {rejectError && (
              <span style={{ fontSize: '12px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>
                {rejectError}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', paddingTop: '4px', borderTop: '1px solid var(--border-light)' }}>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {mode === 'view' ? 'Close' : 'Cancel'}
          </button>

          {mode === 'approve' && (
            <button
              onClick={handleApprove}
              disabled={isSubmitting}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                border: '1px solid rgba(22,134,106,0.4)',
                backgroundColor: 'var(--status-success)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Approving...' : 'Confirm Approval'}
            </button>
          )}

          {mode === 'reject' && (
            <button
              onClick={handleReject}
              disabled={isSubmitting}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                border: '1px solid rgba(201,76,76,0.4)',
                backgroundColor: 'var(--status-danger)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LeaveActionModal;
