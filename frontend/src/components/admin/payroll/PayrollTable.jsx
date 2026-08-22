import React from 'react';
import { formatCurrency } from '../../../utils/formatCurrency';
import PayrollStatusBadge from './PayrollStatusBadge';
import EmptyState from '../../common/EmptyState';
import { PayrollIcon } from '../../common/Icons';

const PayrollTable = ({
  records = [],
  onViewPayslip,
  onResetFilters,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
}) => {
  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No payroll records found"
        description="No employee salary records match your current search query or active filter criteria."
        icon={PayrollIcon}
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
              <th style={{ padding: '14px 14px' }}>Employee ID</th>
              <th style={{ padding: '14px 14px' }}>Department</th>
              <th style={{ padding: '14px 14px', textAlign: 'right' }}>Basic Salary</th>
              <th style={{ padding: '14px 14px', textAlign: 'right' }}>Allowances</th>
              <th style={{ padding: '14px 14px', textAlign: 'right' }}>Gross Salary</th>
              <th style={{ padding: '14px 14px', textAlign: 'right' }}>Deductions</th>
              <th style={{ padding: '14px 14px', textAlign: 'right' }}>Net Salary</th>
              <th style={{ padding: '14px 14px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '14px 22px', textAlign: 'right' }}>Action</th>
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
                      <div>
                        <div
                          style={{
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            fontSize: '13.5px',
                          }}
                        >
                          {rec.employeeName}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ID */}
                  <td
                    style={{
                      padding: '13px 14px',
                      fontFamily: 'monospace',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      color: 'var(--royal-indigo)',
                    }}
                  >
                    {rec.employeeId}
                  </td>

                  {/* Department */}
                  <td style={{ padding: '13px 14px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
                      {rec.department}
                    </span>
                  </td>

                  {/* Basic */}
                  <td
                    style={{
                      padding: '13px 14px',
                      textAlign: 'right',
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                    }}
                  >
                    {formatCurrency(rec.basicSalary)}
                  </td>

                  {/* Allowances */}
                  <td
                    style={{
                      padding: '13px 14px',
                      textAlign: 'right',
                      color: 'var(--status-info)',
                      fontSize: '13px',
                      fontWeight: '600',
                    }}
                  >
                    +{formatCurrency(rec.hra + rec.transportAllowance + rec.medicalAllowance + rec.otherAllowances)}
                  </td>

                  {/* Gross */}
                  <td
                    style={{
                      padding: '13px 14px',
                      textAlign: 'right',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                    }}
                  >
                    {formatCurrency(rec.grossSalary)}
                  </td>

                  {/* Deductions */}
                  <td
                    style={{
                      padding: '13px 14px',
                      textAlign: 'right',
                      color: 'var(--status-danger)',
                      fontSize: '13px',
                      fontWeight: '600',
                    }}
                  >
                    -{formatCurrency(rec.totalDeductions)}
                  </td>

                  {/* Net */}
                  <td
                    style={{
                      padding: '13px 14px',
                      textAlign: 'right',
                      fontWeight: '800',
                      color: 'var(--champagne-gold)',
                      fontSize: '14px',
                    }}
                  >
                    {formatCurrency(rec.netSalary)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '13px 14px', textAlign: 'center' }}>
                    <PayrollStatusBadge status={rec.status} />
                  </td>

                  {/* Action */}
                  <td style={{ padding: '13px 22px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => onViewPayslip(rec)}
                      className="nexus-btn-gold"
                      style={{
                        padding: '4px 11px',
                        fontSize: '12px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      Payslip
                    </button>
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
          Showing <strong>{records.length}</strong> of <strong>{totalCount}</strong> payroll records
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

export default PayrollTable;
