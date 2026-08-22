import React from 'react';
import { CloseIcon } from './Icons';

const ErrorMessage = ({ message = 'An error occurred while processing employee records.', onRetry }) => {
  return (
    <div
      style={{
        padding: '16px 20px',
        backgroundColor: 'var(--status-danger-bg)',
        border: '1px solid rgba(201, 76, 76, 0.25)',
        borderRadius: '12px',
        color: 'var(--status-danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        fontSize: '13.5px',
        fontWeight: '600',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>⚠️ {message}</span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: 'var(--status-danger)',
            color: '#FFFFFF',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
