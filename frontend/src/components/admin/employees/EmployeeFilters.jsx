import React from 'react';

const EmployeeFilters = ({
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
  onReset
}) => {
  const departments = [
    'All',
    'Engineering',
    'Human Resources',
    'Product Design',
    'Marketing',
    'Finance',
    'Operations',
  ];

  const statuses = ['All', 'Active', 'Inactive'];

  const hasActiveFilters = departmentFilter !== 'All' || statusFilter !== 'All';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Department Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)' }}>
          Dept:
        </label>
        <select
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            backgroundColor: '#FFFFFF',
            fontSize: '13px',
            color: 'var(--text-primary)',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept === 'All' ? 'All Departments' : dept}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-secondary)' }}>
          Status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            backgroundColor: '#FFFFFF',
            fontSize: '13px',
            color: 'var(--text-primary)',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {statuses.map((st) => (
            <option key={st} value={st}>
              {st === 'All' ? 'All Statuses' : st}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-light)',
            color: 'var(--text-secondary)',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '12.5px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
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
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmployeeFilters;
