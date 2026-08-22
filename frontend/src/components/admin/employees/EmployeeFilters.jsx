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
          className="nexus-input"
          style={{
            padding: '8px 12px',
            fontSize: '13px',
            cursor: 'pointer',
            width: 'auto',
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
          className="nexus-input"
          style={{
            padding: '8px 12px',
            fontSize: '13px',
            cursor: 'pointer',
            width: 'auto',
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
          type="button"
          onClick={onReset}
          className="nexus-btn-secondary"
          style={{
            padding: '7px 14px',
            fontSize: '12.5px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmployeeFilters;
