import React from 'react';
import { EmployeesIcon } from './Icons';

const EmptyState = ({
  title = 'No records found',
  description = 'No workforce records match your current search query or active filter criteria.',
  icon: Icon = EmployeesIcon,
  actionButton,
}) => {
  return (
    <div
      className="nexus-card"
      style={{
        padding: '54px 28px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(91, 95, 239, 0.08) 0%, rgba(124, 92, 252, 0.05) 100%)',
          border: '1px solid rgba(91, 95, 239, 0.15)',
          color: 'var(--royal-indigo)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '18px',
          boxShadow: '0 4px 12px rgba(91, 95, 239, 0.08)',
        }}
      >
        <Icon size={28} />
      </div>

      <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
        {title}
      </h3>
      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '440px', lineHeight: '1.5' }}>
        {description}
      </p>

      {actionButton && <div style={{ marginTop: '22px' }}>{actionButton}</div>}
    </div>
  );
};

export default EmptyState;
