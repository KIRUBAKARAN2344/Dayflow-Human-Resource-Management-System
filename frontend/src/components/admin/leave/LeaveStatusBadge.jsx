import React from 'react';

const BADGE_STYLES = {
  Pending: {
    bg: 'rgba(200, 138, 26, 0.1)',
    color: 'var(--status-warning)',
    border: 'rgba(200, 138, 26, 0.25)',
    dot: 'var(--status-warning)',
  },
  Approved: {
    bg: 'var(--status-success-bg)',
    color: 'var(--status-success)',
    border: 'rgba(22, 134, 106, 0.25)',
    dot: 'var(--status-success)',
  },
  Rejected: {
    bg: 'var(--status-danger-bg)',
    color: 'var(--status-danger)',
    border: 'rgba(201, 76, 76, 0.25)',
    dot: 'var(--status-danger)',
  },
};

const LeaveStatusBadge = ({ status }) => {
  const s = BADGE_STYLES[status] || BADGE_STYLES.Pending;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '11px',
        fontWeight: '700',
        padding: '3px 10px',
        borderRadius: '12px',
        backgroundColor: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: s.dot,
        }}
      />
      {status}
    </span>
  );
};

export default LeaveStatusBadge;
