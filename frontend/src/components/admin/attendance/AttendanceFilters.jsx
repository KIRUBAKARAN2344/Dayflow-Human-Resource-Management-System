import React from 'react';
import { SearchIcon, CloseIcon } from '../../common/Icons';

const DEPARTMENTS = ['All', 'Engineering', 'Human Resources', 'Product Design', 'Marketing', 'Finance', 'Operations'];
const STATUSES = ['All', 'Present', 'Absent', 'Late', 'Leave', 'Half Day'];
const DATE_OPTIONS = ['Today', 'Yesterday', 'Custom'];

const AttendanceFilters = ({
  searchTerm,
  onSearchChange,
  dateFilter,
  onDateChange,
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
  onReset,
}) => {
  const hasActiveFilters =
    searchTerm ||
    dateFilter !== 'Today' ||
    departmentFilter !== 'All' ||
    statusFilter !== 'All';

  const selectStyle = {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#FFFFFF',
    fontSize: '13px',
    color: 'var(--text-primary)',
    outline: 'none',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--border-light)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Search */}
      <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
        <SearchIcon
          size={15}
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
        />
        <input
          type="text"
          placeholder="Search by employee name or ID..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 34px 9px 36px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-main)',
            fontSize: '13px',
            color: 'var(--text-primary)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--champagne-gold)'; e.target.style.boxShadow = '0 0 0 3px var(--champagne-gold-light)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
          >
            <CloseIcon size={14} />
          </button>
        )}
      </div>

      {/* Date */}
      <select value={dateFilter} onChange={(e) => onDateChange(e.target.value)} style={selectStyle}>
        {DATE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>

      {/* Department */}
      <select value={departmentFilter} onChange={(e) => onDepartmentChange(e.target.value)} style={selectStyle}>
        {DEPARTMENTS.map((d) => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
      </select>

      {/* Status */}
      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} style={selectStyle}>
        {STATUSES.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
      </select>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-light)',
            color: 'var(--text-secondary)',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12.5px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-main)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default AttendanceFilters;
