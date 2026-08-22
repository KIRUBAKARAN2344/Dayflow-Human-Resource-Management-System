import React from 'react';

const ErrorMessage = ({ message = 'An error occurred while processing employee records.', onRetry }) => {
  return (
    <div
      style={{
        padding: '16px 20px',
        backgroundColor: 'var(--status-danger-bg)',
        border: '1px solid var(--status-danger-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--status-danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '22px',
        fontSize: '13.5px',
        fontWeight: '600',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          ⚠️
        </span>
        <span>{message}</span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: 'var(--status-danger)',
            color: '#FFFFFF',
            border: 'none',
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'filter var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
