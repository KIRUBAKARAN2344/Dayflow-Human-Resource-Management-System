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

  return (
    <div
      className="nexus-card"
      style={{
        padding: '16px 20px',
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
          className="nexus-input"
          style={{
            paddingLeft: '36px',
            paddingRight: searchTerm ? '32px' : '14px',
            paddingTop: '8px',
            paddingBottom: '8px',
            fontSize: '13px',
          }}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
          >
            <CloseIcon size={14} />
          </button>
        )}
      </div>

      {/* Date */}
      <select
        value={dateFilter}
        onChange={(e) => onDateChange(e.target.value)}
        className="nexus-input"
        style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
      >
        {DATE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>

      {/* Department */}
      <select
        value={departmentFilter}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="nexus-input"
        style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
      >
        {DEPARTMENTS.map((d) => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
      </select>

      {/* Status */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="nexus-input"
        style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
      >
        {STATUSES.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
      </select>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="nexus-btn-secondary"
          style={{
            padding: '7px 14px',
            fontSize: '12.5px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default AttendanceFilters;
