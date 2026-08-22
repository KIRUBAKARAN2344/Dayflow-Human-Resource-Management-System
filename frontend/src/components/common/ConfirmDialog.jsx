import React from 'react';
import Modal from './Modal';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this operation?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="480px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              minWidth: '42px',
              borderRadius: '12px',
              backgroundColor: isDanger ? 'var(--status-danger-bg)' : 'var(--royal-indigo-light)',
              color: isDanger ? 'var(--status-danger)' : 'var(--royal-indigo)',
              border: `1px solid ${isDanger ? 'var(--status-danger-border)' : 'rgba(91, 95, 239, 0.2)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            {isDanger ? '⚠️' : 'ℹ️'}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5', paddingTop: '2px' }}>
            {message}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-primary)',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: '9px 20px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: isDanger ? 'var(--status-danger)' : 'var(--royal-indigo)',
              color: '#FFFFFF',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: isDanger
                ? '0 4px 12px rgba(239, 68, 68, 0.3)'
                : '0 4px 12px rgba(91, 95, 239, 0.35)',
              transition: 'filter var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
