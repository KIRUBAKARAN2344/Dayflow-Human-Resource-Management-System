import React from 'react';

const EmployeeStatusBadge = ({ status }) => {
  const isActive = status === 'Active';

  return (
    <span
      className={`nexus-pill ${isActive ? 'nexus-pill-success' : 'nexus-pill-neutral'}`}
      style={{
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        fontSize: '11px',
      }}
    >
      <span className="nexus-dot" />
      {status || 'Active'}
    </span>
  );
};

export default EmployeeStatusBadge;
