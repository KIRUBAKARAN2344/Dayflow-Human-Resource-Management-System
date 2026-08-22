import React from 'react';

const EmployeeStatusBadge = ({ status }) => {
  const isActive = status === 'Active';

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
        backgroundColor: isActive ? 'var(--status-success-bg)' : 'rgba(105, 112, 134, 0.1)',
        color: isActive ? 'var(--status-success)' : 'var(--text-secondary)',
        border: `1px solid ${isActive ? 'rgba(22, 134, 106, 0.25)' : 'var(--border-light)'}`,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isActive ? 'var(--status-success)' : 'var(--text-muted)',
          boxShadow: isActive ? '0 0 6px var(--status-success)' : 'none',
        }}
      />
      {status || 'Active'}
    </span>
  );
};

export default EmployeeStatusBadge;
