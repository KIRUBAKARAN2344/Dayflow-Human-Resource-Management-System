import React, { useEffect } from 'react';
import Button from './Button';

/**
 * Combined Modal component — supports both Admin (dark navy header + CloseIcon)
 * and Employee (white card + X icon from lucide-react, optional footer prop) usage patterns.
 */
const Modal = ({ isOpen, onClose, title, children, maxWidth = '540px', footer }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color, #e2e8f0)',
          overflow: 'hidden',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.15s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: 'var(--text-main, #0f172a)' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted, #64748b)',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '12px 24px',
              borderTop: '1px solid var(--border-color, #e2e8f0)',
              backgroundColor: '#ffffff',
            }}
          >
            {footer}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '12px 24px',
              borderTop: '1px solid var(--border-color, #e2e8f0)',
            }}
          >
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
