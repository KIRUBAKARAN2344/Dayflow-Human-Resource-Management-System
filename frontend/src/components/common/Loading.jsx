import React from 'react';

const Loading = ({ message = 'Loading workforce intelligence...' }) => {
  return (
    <div
      className="nexus-card"
      style={{
        padding: '54px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        textAlign: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '48px', height: '48px' }}>
        {/* Outer Ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid var(--royal-indigo-light)',
            borderTopColor: 'var(--royal-indigo)',
            animation: 'spin 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          }}
        />
        {/* Inner Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '6px',
            borderRadius: '50%',
            border: '2px solid var(--champagne-gold-light)',
            borderTopColor: 'var(--champagne-gold)',
            animation: 'spin 0.6s linear infinite reverse',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '14.5px', color: 'var(--text-primary)', fontWeight: '700', letterSpacing: '-0.01em' }}>
          {message}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Dayflow Royal Nexus Real-Time Sync
        </span>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
