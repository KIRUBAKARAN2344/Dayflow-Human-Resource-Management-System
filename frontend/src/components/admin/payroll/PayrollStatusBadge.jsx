import React from 'react';

const PayrollStatusBadge = ({ status }) => {
  const isProcessed = status === 'Processed';

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
        backgroundColor: isProcessed ? 'var(--status-success-bg)' : 'var(--status-warning-bg)',
        color: isProcessed ? 'var(--status-success)' : 'var(--status-warning)',
        border: `1px solid ${isProcessed ? 'rgba(22, 134, 106, 0.25)' : 'rgba(200, 138, 26, 0.25)'}`,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isProcessed ? 'var(--status-success)' : 'var(--status-warning)',
        }}
      />
      {status || 'Pending'}
    </span>
  );
};

export default PayrollStatusBadge;
