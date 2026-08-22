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
              type="button"
              onClick={onResetFilters}
              className="nexus-btn-primary"
            >
              Reset Filters
            </button>
          )
        }
      />
    );
  }

  return (
    <div className="nexus-table-wrapper">
      <div style={{ overflowX: 'auto' }}>
        <table className="nexus-table">
          <thead>
            <tr>
              <th style={{ padding: '14px 22px' }}>Employee</th>
              <th style={{ padding: '14px 16px' }}>Employee ID</th>
              <th style={{ padding: '14px 16px' }}>Department</th>
              <th style={{ padding: '14px 16px' }}>Job Title</th>
              <th style={{ padding: '14px 16px' }}>Joining Date</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 22px', textAlign: 'right' }}>Actions</th>
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
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'rgba(248, 250, 252, 0.6)',
                  }}
                >
                  {/* Name & Avatar */}
                  <td style={{ padding: '14px 22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: emp.avatarColor
                            ? `linear-gradient(135deg, ${emp.avatarColor} 0%, #171D38 100%)`
                            : 'linear-gradient(135deg, var(--royal-indigo) 0%, var(--royal-violet) 100%)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: '700',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
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
                            fontSize: '13.5px',
                            transition: 'color var(--transition-fast)',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--royal-indigo)')}
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
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-main)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '12px',
                      }}
                    >
                      {emp.department}
                    </span>
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
                  <td style={{ padding: '14px 22px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      {/* View Profile */}
                      <button
                        type="button"
                        onClick={() => onView(emp)}
                        className="nexus-btn-secondary"
                        style={{
                          padding: '5px 11px',
                          fontSize: '12px',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(emp)}
                        className="nexus-btn-gold"
                        style={{
                          padding: '5px 11px',
                          fontSize: '12px',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        Edit
                      </button>

                      {/* Toggle Status */}
                      <button
                        type="button"
                        onClick={() => onToggleStatus(emp)}
                        style={{
                          padding: '5px 11px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: emp.status === 'Active' ? 'var(--status-danger-border)' : 'var(--status-success-border)',
                          backgroundColor: emp.status === 'Active' ? 'var(--status-danger-bg)' : 'var(--status-success-bg)',
                          color: emp.status === 'Active' ? 'var(--status-danger)' : 'var(--status-success)',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'brightness(0.95)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'none';
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
          padding: '14px 22px',
          backgroundColor: 'var(--bg-surface-subtle)',
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
        <span style={{ fontWeight: '600', color: 'var(--royal-indigo)', letterSpacing: '0.02em' }}>
          Dayflow Royal Nexus Directory
        </span>
      </div>
    </div>
  );
};

export default EmployeeTable;
