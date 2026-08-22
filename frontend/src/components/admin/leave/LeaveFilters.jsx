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

  return (
    <div
      className="nexus-card"
      style={{
        padding: '16px 20px',
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

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="nexus-input"
          style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
          ))}
        </select>

        {/* Leave Type */}
        <select
          value={leaveTypeFilter}
          onChange={(e) => onLeaveTypeChange(e.target.value)}
          className="nexus-input"
          style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
        >
          {LEAVE_TYPES.map((t) => (
            <option key={t} value={t}>{t === 'All' ? 'All Leave Types' : t}</option>
          ))}
        </select>

        {/* Department */}
        <select
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="nexus-input"
          style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
          ))}
        </select>

        {/* Date */}
        <select
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
          className="nexus-input"
          style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
        >
          {DATE_OPTIONS.map((d) => (
            <option key={d} value={d}>{d === 'All' ? 'All Dates' : d}</option>
          ))}
        </select>

        {/* Reset Filters */}
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
    </div>
  );
};

export default LeaveFilters;
