import React from 'react';

const LeaveStatusBadge = ({ status }) => {
  const getBadgeClass = (st) => {
    switch (st) {
      case 'Approved':
        return 'nexus-pill-success';
      case 'Rejected':
        return 'nexus-pill-danger';
      case 'Pending':
      default:
        return 'nexus-pill-warning';
    }
  };

  return (
    <span
      className={`nexus-pill ${getBadgeClass(status)}`}
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

export default LeaveStatusBadge;
