import React from 'react';
import { SearchIcon, CloseIcon } from '../../common/Icons';

const LEAVE_TYPES = [
  'All',
  'Casual Leave',
  'Sick Leave',
  'Earned Leave',
  'Annual Leave',
  'Maternity Leave',
  'Unpaid Leave',
  'Other',
];

const DEPARTMENTS = [
  'All',
  'Engineering',
  'Human Resources',
  'Product Design',
  'Marketing',
  'Finance',
  'Operations',
];

const STATUSES = ['All', 'Pending', 'Approved', 'Rejected'];
const DATE_OPTIONS = ['All', 'Today', 'This Week', 'This Month'];

const LeaveFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  leaveTypeFilter,
  onLeaveTypeChange,
  departmentFilter,
  onDepartmentChange,
  dateFilter,
  onDateChange,
  onReset,
}) => {
  const hasActiveFilters =
    searchTerm ||
    statusFilter !== 'All' ||
    leaveTypeFilter !== 'All' ||
    departmentFilter !== 'All' ||
    dateFilter !== 'All';

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
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
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
              boxShadow: 'var(--shadow-sm)',
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
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
            >
              <CloseIcon size={14} />
            </button>
          )}
        </div>

        {/* Status */}
        <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} style={selectStyle}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
          ))}
        </select>

        {/* Leave Type */}
        <select value={leaveTypeFilter} onChange={(e) => onLeaveTypeChange(e.target.value)} style={selectStyle}>
          {LEAVE_TYPES.map((t) => (
            <option key={t} value={t}>{t === 'All' ? 'All Leave Types' : t}</option>
          ))}
        </select>

        {/* Department */}
        <select value={departmentFilter} onChange={(e) => onDepartmentChange(e.target.value)} style={selectStyle}>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
          ))}
        </select>

        {/* Date */}
        <select value={dateFilter} onChange={(e) => onDateChange(e.target.value)} style={selectStyle}>
          {DATE_OPTIONS.map((d) => (
            <option key={d} value={d}>{d === 'All' ? 'All Dates' : d}</option>
          ))}
        </select>

        {/* Reset Filters */}
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
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-main)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaveFilters;
