import React from 'react';
import EmployeeStatusBadge from './EmployeeStatusBadge';
import EmptyState from '../../common/EmptyState';

const EmployeeTable = ({
  employees = [],
  onView,
  onEdit,
  onToggleStatus,
  onResetFilters
}) => {
  if (!employees || employees.length === 0) {
    return (
      <EmptyState
        title="No matching employees found"
        description="Try adjusting your search query or department/status filters to find workforce records."
        actionButton={
          onResetFilters && (
            <button
              onClick={onResetFilters}
              style={{
                backgroundColor: 'var(--navy-deep)',
                color: 'var(--champagne-gold)',
                border: '1px solid var(--champagne-gold)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          )
        }
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '13.5px',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--navy-deep)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-dark)',
              }}
            >
              <th style={{ padding: '14px 20px' }}>Employee</th>
              <th style={{ padding: '14px 16px' }}>ID</th>
              <th style={{ padding: '14px 16px' }}>Department</th>
              <th style={{ padding: '14px 16px' }}>Job Title</th>
              <th style={{ padding: '14px 16px' }}>Joining Date</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => {
              const initials = emp.name
                ? emp.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                : 'E';

              return (
                <tr
                  key={emp.id}
                  style={{
                    borderBottom: idx === employees.length - 1 ? 'none' : '1px solid var(--border-light)',
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'rgba(246, 247, 251, 0.5)',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.04)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? '#FFFFFF' : 'rgba(246, 247, 251, 0.5)')
                  }
                >
                  {/* Name & Avatar */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: emp.avatarColor || 'var(--royal-indigo)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: '700',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          flexShrink: 0,
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div
                          onClick={() => onView(emp)}
                          style={{
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--champagne-gold)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        >
                          {emp.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ID */}
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--royal-indigo)', fontFamily: 'monospace', fontSize: '13px' }}>
                    {emp.id}
                  </td>

                  {/* Department */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    {emp.department}
                  </td>

                  {/* Job Title */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                    {emp.jobTitle}
                  </td>

                  {/* Joining Date */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '12.5px' }}>
                    {emp.joiningDate}
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '14px 16px' }}>
                    <EmployeeStatusBadge status={emp.status} />
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      {/* View Profile */}
                      <button
                        onClick={() => onView(emp)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-light)',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--royal-indigo)',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(emp)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--champagne-gold)',
                          backgroundColor: 'rgba(201, 162, 39, 0.08)',
                          color: 'var(--navy-deep)',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>

                      {/* Toggle Status */}
                      <button
                        onClick={() => onToggleStatus(emp)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-light)',
                          backgroundColor: emp.status === 'Active' ? 'var(--status-danger-bg)' : 'var(--status-success-bg)',
                          color: emp.status === 'Active' ? 'var(--status-danger)' : 'var(--status-success)',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {emp.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Summary */}
      <div
        style={{
          padding: '12px 20px',
          backgroundColor: 'var(--bg-main)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px',
          color: 'var(--text-secondary)',
        }}
      >
        <span>
          Showing <strong>{employees.length}</strong> employee record{employees.length !== 1 ? 's' : ''}
        </span>
        <span style={{ fontWeight: '600', color: 'var(--champagne-gold)' }}>
          Royal Executive Workforce Console
        </span>
      </div>
    </div>
  );
};

export default EmployeeTable;
