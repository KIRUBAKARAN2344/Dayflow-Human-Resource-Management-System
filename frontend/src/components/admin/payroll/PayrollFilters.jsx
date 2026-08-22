import React from 'react';
import { SearchIcon, CloseIcon } from '../../common/Icons';

const MONTH_OPTIONS = [
  { value: '2026-08', label: 'August 2026' },
  { value: '2026-07', label: 'July 2026' },
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

const STATUSES = ['All', 'Pending', 'Processed'];

const SALARY_RANGES = [
  'All',
  'Below ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  'Above ₹1,00,000',
];

const PayrollFilters = ({
  selectedMonth,
  onMonthChange,
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
  salaryRangeFilter,
  onSalaryRangeChange,
  onReset,
}) => {
  const hasActiveFilters =
    searchTerm ||
    departmentFilter !== 'All' ||
    statusFilter !== 'All' ||
    salaryRangeFilter !== 'All';

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
        {/* Month Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            Period:
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="nexus-input"
            style={{
              width: 'auto',
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: '700',
              borderColor: 'rgba(212, 175, 55, 0.4)',
              backgroundColor: 'var(--champagne-gold-light)',
              color: 'var(--midnight-navy)',
              cursor: 'pointer',
            }}
          >
            {MONTH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <SearchIcon
            size={15}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search employee, ID, department..."
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
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '2px',
              }}
            >
              <CloseIcon size={14} />
            </button>
          )}
        </div>

        {/* Department Filter */}
        <select
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="nexus-input"
          style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
        >
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept === 'All' ? 'All Departments' : dept}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="nexus-input"
          style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
        >
          {STATUSES.map((st) => (
            <option key={st} value={st}>
              {st === 'All' ? 'All Statuses' : st}
            </option>
          ))}
        </select>

        {/* Salary Range Filter */}
        <select
          value={salaryRangeFilter}
          onChange={(e) => onSalaryRangeChange(e.target.value)}
          className="nexus-input"
          style={{ width: 'auto', padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
        >
          {SALARY_RANGES.map((range) => (
            <option key={range} value={range}>
              {range === 'All' ? 'All Salary Ranges' : range}
            </option>
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

export default PayrollFilters;
