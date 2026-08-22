import React from 'react';

const LeaveStatus = ({ status }) => {
  const normalizedStatus = (status || 'PENDING').toUpperCase();
  
  return (
    <span className={`badge badge-${normalizedStatus.toLowerCase()}`}>
      {normalizedStatus}
    </span>
  );
};

export default LeaveStatus;
