import React from 'react';

const Loading = ({ message = 'Loading workforce data...' }) => {
  return (
    <div
      style={{
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '3px solid var(--champagne-gold-light)',
          borderTopColor: 'var(--champagne-gold)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>
        {message}
      </span>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
