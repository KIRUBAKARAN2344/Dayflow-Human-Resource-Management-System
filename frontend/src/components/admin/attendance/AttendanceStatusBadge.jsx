import React from 'react';

const AttendanceStatusBadge = ({ status }) => {
  const getBadgeStyle = (st) => {
    switch (st) {
      case 'Present':
        return {
          bg: 'var(--status-success-bg)',
          color: 'var(--status-success)',
          border: 'rgba(22, 134, 106, 0.25)',
          dot: 'var(--status-success)',
        };
      case 'Late':
        return {
          bg: 'var(--status-warning-bg)',
          color: 'var(--status-warning)',
          border: 'rgba(200, 138, 26, 0.25)',
          dot: 'var(--status-warning)',
        };
      case 'Leave':
        return {
          bg: 'rgba(201, 162, 39, 0.12)',
          color: 'var(--champagne-gold)',
          border: 'rgba(201, 162, 39, 0.3)',
          dot: 'var(--champagne-gold)',
        };
      case 'Half Day':
        return {
          bg: 'rgba(37, 99, 235, 0.1)',
          color: '#2563EB',
          border: 'rgba(37, 99, 235, 0.25)',
          dot: '#2563EB',
        };
      case 'Absent':
      default:
        return {
          bg: 'var(--status-danger-bg)',
          color: 'var(--status-danger)',
          border: 'rgba(201, 76, 76, 0.25)',
          dot: 'var(--status-danger)',
        };
    }
  };

  const style = getBadgeStyle(status);

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
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: style.dot,
          boxShadow: `0 0 6px ${style.dot}`,
        }}
      />
      {status || 'Present'}
    </span>
  );
};

export default AttendanceStatusBadge;
