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
        {/* Month Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            Period:
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            style={{
              ...selectStyle,
              fontWeight: '700',
              borderColor: 'var(--champagne-gold)',
              backgroundColor: 'rgba(201, 162, 39, 0.06)',
              color: 'var(--navy-deep)',
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
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--champagne-gold)';
              e.target.style.boxShadow = '0 0 0 3px var(--champagne-gold-light)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-light)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchTerm && (
            <button
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
          style={selectStyle}
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
          style={selectStyle}
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
          style={selectStyle}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-main)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
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
