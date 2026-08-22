import React from 'react';
import LeaveStatusBadge from './LeaveStatusBadge';
import EmptyState from '../../common/EmptyState';
import { LeaveIcon } from '../../common/Icons';

const LeaveTable = ({
  records = [],
  onView,
  onApprove,
  onReject,
  onResetFilters,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
}) => {
  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No leave requests found"
        description="No leave requests match your current search query or active filter criteria."
        icon={LeaveIcon}
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

  const LEAVE_TYPE_COLORS = {
    'Casual Leave': '#7C3AED',
    'Sick Leave': '#DC2626',
    'Earned Leave': '#059669',
    'Annual Leave': '#2563EB',
    'Maternity Leave': '#DB2777',
    'Unpaid Leave': '#6B7280',
    'Other': '#D97706',
  };

  return (
    <div className="nexus-table-wrapper">
      <div style={{ overflowX: 'auto' }}>
        <table className="nexus-table">
          <thead>
            <tr>
              <th style={{ padding: '14px 22px' }}>Employee</th>
              <th style={{ padding: '14px 16px' }}>Employee ID</th>
              <th style={{ padding: '14px 16px' }}>Department</th>
              <th style={{ padding: '14px 16px' }}>Leave Type</th>
              <th style={{ padding: '14px 16px' }}>From</th>
              <th style={{ padding: '14px 16px' }}>To</th>
              <th style={{ padding: '14px 12px', textAlign: 'center' }}>Days</th>
              <th style={{ padding: '14px 16px' }}>Applied On</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 22px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, idx) => {
              const initials = rec.employeeName
                ? rec.employeeName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                : 'E';
              const isPending = rec.status === 'Pending';
              const typeColor = LEAVE_TYPE_COLORS[rec.leaveType] || '#6B7280';

              return (
                <tr
                  key={rec.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'rgba(248, 250, 252, 0.6)',
                  }}
                >
                  {/* Employee Name + Avatar */}
                  <td style={{ padding: '13px 22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          background: rec.avatarColor
                            ? `linear-gradient(135deg, ${rec.avatarColor} 0%, #171D38 100%)`
                            : 'linear-gradient(135deg, var(--royal-indigo) 0%, var(--royal-violet) 100%)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '700',
                          flexShrink: 0,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      >
                        {initials}
                      </div>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13.5px' }}>
                        {rec.employeeName}
                      </span>
                    </div>
                  </td>

                  {/* ID */}
                  <td style={{ padding: '13px 16px', fontFamily: 'monospace', fontSize: '12.5px', fontWeight: '700', color: 'var(--royal-indigo)' }}>
                    {rec.employeeId}
                  </td>

                  {/* Department */}
                  <td style={{ padding: '13px 16px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
                      {rec.department}
                    </span>
                  </td>

                  {/* Leave Type */}
                  <td style={{ padding: '13px 16px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: `${typeColor}15`,
                        color: typeColor,
                        border: `1px solid ${typeColor}30`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {rec.leaveType}
                    </span>
                  </td>

                  {/* Dates */}
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', fontSize: '12.5px' }}>{rec.startDate}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', fontSize: '12.5px' }}>{rec.endDate}</td>

                  {/* Days */}
                  <td style={{ padding: '13px 12px', textAlign: 'center' }}>
                    <span style={{ fontWeight: '800', fontSize: '13.5px', color: 'var(--text-primary)' }}>
                      {rec.days}
                    </span>
                  </td>

                  {/* Applied On */}
                  <td style={{ padding: '13px 16px', color: 'var(--text-muted)', fontSize: '12.5px' }}>{rec.appliedOn}</td>

                  {/* Status */}
                  <td style={{ padding: '13px 16px' }}>
                    <LeaveStatusBadge status={rec.status} />
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '13px 22px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => onView(rec)}
                        className="nexus-btn-secondary"
                        style={{
                          padding: '4px 10px',
                          fontSize: '12px',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        View
                      </button>

                      {isPending && (
                        <>
                          <button
                            type="button"
                            onClick={() => onApprove(rec)}
                            className="nexus-btn-success"
                            style={{
                              padding: '4px 10px',
                              fontSize: '12px',
                              borderRadius: 'var(--radius-sm)',
                            }}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => onReject(rec)}
                            className="nexus-btn-danger"
                            style={{
                              padding: '4px 10px',
                              fontSize: '12px',
                              borderRadius: 'var(--radius-sm)',
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          padding: '14px 22px',
          backgroundColor: 'var(--bg-surface-subtle)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12.5px',
          color: 'var(--text-secondary)',
        }}
      >
        <span>
          Showing <strong>{records.length}</strong> of <strong>{totalCount}</strong> leave requests
        </span>

        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="nexus-btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                opacity: currentPage <= 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <span style={{ padding: '0 8px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="nexus-btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                opacity: currentPage >= totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveTable;
