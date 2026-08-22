import React from 'react';
import AttendanceStatusBadge from './AttendanceStatusBadge';
import EmptyState from '../../common/EmptyState';
import { AttendanceIcon } from '../../common/Icons';

const AttendanceTable = ({
  records = [],
  onView,
  onResetFilters,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
}) => {
  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No attendance records found"
        description="No records match your current search query or filter criteria. Try adjusting your filters."
        icon={AttendanceIcon}
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
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--navy-deep)', color: '#FFFFFF', fontSize: '11.5px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 20px' }}>Employee</th>
              <th style={{ padding: '14px 14px' }}>ID</th>
              <th style={{ padding: '14px 14px' }}>Department</th>
              <th style={{ padding: '14px 14px' }}>Date</th>
              <th style={{ padding: '14px 14px' }}>Check In</th>
              <th style={{ padding: '14px 14px' }}>Check Out</th>
              <th style={{ padding: '14px 14px', textAlign: 'center' }}>Working Hrs</th>
              <th style={{ padding: '14px 14px' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, idx) => {
              const initials = rec.employeeName
                .split(' ')
                .map((n) => n[0])
                .join('');
              return (
                <tr
                  key={rec.id}
                  style={{
                    borderBottom: idx === records.length - 1 ? 'none' : '1px solid var(--border-light)',
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'rgba(246,247,251,0.5)',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(201,162,39,0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#FFFFFF' : 'rgba(246,247,251,0.5)')}
                >
                  {/* Employee */}
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px', height: '34px', borderRadius: '50%',
                          backgroundColor: rec.avatarColor || 'var(--royal-indigo)',
                          color: '#FFFFFF', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0,
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{rec.employeeName}</div>
                      </div>
                    </div>
                  </td>
                  {/* ID */}
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: '12.5px', fontWeight: '700', color: 'var(--royal-indigo)' }}>
                    {rec.employeeId}
                  </td>
                  {/* Dept */}
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{rec.department}</td>
                  {/* Date */}
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '12.5px' }}>{rec.date}</td>
                  {/* Check In */}
                  <td style={{ padding: '12px 14px', fontWeight: '600', color: 'var(--text-primary)' }}>{rec.checkIn}</td>
                  {/* Check Out */}
                  <td style={{ padding: '12px 14px', fontWeight: '600', color: 'var(--text-primary)' }}>{rec.checkOut}</td>
                  {/* Working Hours */}
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <span style={{ fontWeight: '700', color: 'var(--champagne-gold)', fontSize: '13.5px' }}>
                      {rec.workingHours}
                    </span>
                  </td>
                  {/* Status */}
                  <td style={{ padding: '12px 14px' }}>
                    <AttendanceStatusBadge status={rec.status} />
                  </td>
                  {/* Action */}
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => onView(rec)}
                      style={{
                        padding: '5px 12px',
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer + Pagination */}
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
          Showing <strong>{records.length}</strong> of <strong>{totalCount}</strong> record{totalCount !== 1 ? 's' : ''}
        </span>

        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', backgroundColor: currentPage === 1 ? 'var(--bg-main)' : '#FFFFFF', color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)', fontSize: '12.5px', fontWeight: '600', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                style={{ padding: '5px 10px', borderRadius: '6px', border: `1px solid ${currentPage === page ? 'var(--champagne-gold)' : 'var(--border-light)'}`, backgroundColor: currentPage === page ? 'var(--navy-deep)' : '#FFFFFF', color: currentPage === page ? 'var(--champagne-gold)' : 'var(--text-primary)', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', minWidth: '32px' }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', backgroundColor: currentPage === totalPages ? 'var(--bg-main)' : '#FFFFFF', color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)', fontSize: '12.5px', fontWeight: '600', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;
