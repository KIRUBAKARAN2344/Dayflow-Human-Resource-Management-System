import React from 'react';

const AttendanceStatusBadge = ({ status }) => {
  const getBadgeClass = (st) => {
    switch (st) {
      case 'Present':
        return 'nexus-pill-success';
      case 'Late':
        return 'nexus-pill-warning';
      case 'Leave':
        return 'nexus-pill-gold';
      case 'Half Day':
        return 'nexus-pill-info';
      case 'Absent':
      default:
        return 'nexus-pill-danger';
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
      {status || 'Present'}
    </span>
  );
};

export default AttendanceStatusBadge;
