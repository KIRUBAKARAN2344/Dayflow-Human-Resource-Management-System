import React from 'react';

const PayrollStatusBadge = ({ status }) => {
  const isProcessed = status === 'Processed';

  return (
    <span
      className={`nexus-pill ${isProcessed ? 'nexus-pill-success' : 'nexus-pill-warning'}`}
      style={{
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        fontSize: '11px',
      }}
    >
      <span className="nexus-dot" />
      {status || 'Pending'}
    </span>
  );
};

export default PayrollStatusBadge;
