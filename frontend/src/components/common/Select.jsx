import React from 'react';

const Select = ({
  options = [],
  value,
  onChange,
  label,
  error,
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
      <select
        value={value}
        onChange={onChange}
        className={`nexus-input ${className}`}
        style={{
          cursor: 'pointer',
          borderColor: error ? 'var(--status-danger)' : undefined,
          ...style,
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: '12px', color: 'var(--status-danger)', fontWeight: '500' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
