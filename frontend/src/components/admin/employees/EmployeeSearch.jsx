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
        className="nexus-input"
        style={{
          paddingLeft: '38px',
          paddingRight: value ? '34px' : '14px',
        }}
      />

      {value && (
        <button
          type="button"
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
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default EmployeeSearch;
