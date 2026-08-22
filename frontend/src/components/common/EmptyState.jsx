import React from 'react';
import { EmployeesIcon } from './Icons';

const EmptyState = ({
  title = 'No employees found',
  description = 'No workforce records match your current search query or active filter criteria.',
  icon: Icon = EmployeesIcon,
  actionButton,
}) => {
  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '14px',
          backgroundColor: 'rgba(23, 29, 56, 0.06)',
          color: 'var(--royal-indigo)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Icon size={28} />
      </div>

      <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
        {title}
      </h3>
      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '420px', lineHeight: '1.4' }}>
        {description}
      </p>

      {actionButton && <div style={{ marginTop: '20px' }}>{actionButton}</div>}
    </div>
  );
};

export default EmptyState;
