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
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--navy-deep)',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <th style={{ padding: '14px 20px' }}>Employee</th>
              <th style={{ padding: '14px 16px' }}>ID</th>
              <th style={{ padding: '14px 16px' }}>Dept.</th>
              <th style={{ padding: '14px 16px' }}>Leave Type</th>
              <th style={{ padding: '14px 16px' }}>From</th>
              <th style={{ padding: '14px 16px' }}>To</th>
              <th style={{ padding: '14px 12px', textAlign: 'center' }}>Days</th>
              <th style={{ padding: '14px 16px' }}>Applied On</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, idx) => {
              const initials = rec.employeeName
                .split(' ')
                .map((n) => n[0])
                .join('');
              const isPending = rec.status === 'Pending';
              const typeColor = LEAVE_TYPE_COLORS[rec.leaveType] || '#6B7280';

              return (
                <tr
                  key={rec.id}
                  style={{
                    borderBottom: idx === records.length - 1 ? 'none' : '1px solid var(--border-light)',
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'rgba(246, 247, 251, 0.5)',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#FFFFFF' : 'rgba(246, 247, 251, 0.5)')}
                >
                  {/* Employee Name + Avatar */}
                  <td style={{ padding: '13px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: rec.avatarColor || 'var(--royal-indigo)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '700',
                          flexShrink: 0,
                        }}
                      >
                        {initials}
                      </div>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px' }}>
                        {rec.employeeName}
                      </span>
                    </div>
                  </td>

                  {/* ID */}
                  <td style={{ padding: '13px 16px', fontFamily: 'monospace', fontSize: '12.5px', fontWeight: '700', color: 'var(--royal-indigo)' }}>
                    {rec.employeeId}
                  </td>

                  {/* Department */}
                  <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    {rec.department}
                  </td>

                  {/* Leave Type */}
                  <td style={{ padding: '13px 16px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '8px',
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
                    <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>
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
                  <td style={{ padding: '13px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => onView(rec)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-light)',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--royal-indigo)',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        View
                      </button>

                      {isPending && (
                        <>
                          <button
                            onClick={() => onApprove(rec)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1px solid rgba(22, 134, 106, 0.4)',
                              backgroundColor: 'var(--status-success-bg)',
                              color: 'var(--status-success)',
                              fontSize: '11.5px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onReject(rec)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1px solid rgba(201, 76, 76, 0.4)',
                              backgroundColor: 'var(--status-danger-bg)',
                              color: 'var(--status-danger)',
                              fontSize: '11.5px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
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

      {/* Table Footer: Record count + Pagination */}
      <div
        style={{
          padding: '12px 20px',
          backgroundColor: 'var(--bg-main)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
          Showing <strong>{records.length}</strong> of <strong>{totalCount}</strong> request{totalCount !== 1 ? 's' : ''}
        </span>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-light)',
                backgroundColor: currentPage === 1 ? 'var(--bg-main)' : '#FFFFFF',
                color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${currentPage === page ? 'var(--champagne-gold)' : 'var(--border-light)'}`,
                  backgroundColor: currentPage === page ? 'var(--navy-deep)' : '#FFFFFF',
                  color: currentPage === page ? 'var(--champagne-gold)' : 'var(--text-primary)',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  minWidth: '32px',
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-light)',
                backgroundColor: currentPage === totalPages ? 'var(--bg-main)' : '#FFFFFF',
                color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
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
