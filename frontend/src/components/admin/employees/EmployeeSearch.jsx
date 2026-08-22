import React from 'react';
import { SearchIcon, CloseIcon } from '../../common/Icons';

const EmployeeSearch = ({ value, onChange }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minWidth: '260px',
        flex: 1,
      }}
    >
      <SearchIcon
        size={16}
        style={{
          position: 'absolute',
          left: '14px',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        placeholder="Search by employee name, ID, or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 36px 10px 38px',
          borderRadius: '10px',
          border: '1px solid var(--border-light)',
          backgroundColor: '#FFFFFF',
          fontSize: '13.5px',
          color: 'var(--text-primary)',
          outline: 'none',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all var(--transition-fast)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--champagne-gold)';
          e.target.style.boxShadow = '0 0 0 3px var(--champagne-gold-light)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-light)';
          e.target.style.boxShadow = 'var(--shadow-sm)';
        }}
      />

      {value && (
        <button
          onClick={() => onChange('')}
          title="Clear Search"
          style={{
            position: 'absolute',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default EmployeeSearch;
