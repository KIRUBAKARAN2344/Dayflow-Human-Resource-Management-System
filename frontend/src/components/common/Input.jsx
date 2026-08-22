import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  icon: Icon,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`nexus-input ${className}`}
          style={{
            paddingLeft: Icon ? '36px' : '14px',
            borderColor: error ? 'var(--status-danger)' : undefined,
            ...style,
          }}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: '12px', color: 'var(--status-danger)', fontWeight: '500' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
