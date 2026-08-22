import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

const Modal = ({ isOpen, onClose, title, children, maxWidth = '540px' }) => {
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
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(8, 11, 24, 0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'opacity var(--transition-normal)',
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(8, 11, 24, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          zIndex: 210,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 26px',
            background: 'linear-gradient(135deg, var(--midnight-navy) 0%, var(--navy-surface) 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--champagne-gold)',
                boxShadow: '0 0 8px var(--champagne-gold)',
              }}
            />
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '26px',
            overflowY: 'auto',
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
