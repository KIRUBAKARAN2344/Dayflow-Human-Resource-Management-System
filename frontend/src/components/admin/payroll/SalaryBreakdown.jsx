import React from 'react';
import Modal from '../../common/Modal';
import { formatCurrency } from '../../../utils/formatCurrency';
import PayrollStatusBadge from './PayrollStatusBadge';

const SalaryBreakdown = ({ isOpen, onClose, record }) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Payslip - ${record.employeeName} (${record.month})`}
      maxWidth="680px"
    >
      <div id="printable-payslip" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Payslip Header Card */}
        <div
          style={{
            padding: '18px 22px',
            backgroundColor: 'var(--midnight-navy)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--champagne-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              DAYFLOW ROYAL NEXUS HRMS
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', marginTop: '2px', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Executive Compensation Payslip
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--champagne-gold)' }}>
              Period: {record.month}
            </div>
            <div style={{ marginTop: '4px' }}>
              <PayrollStatusBadge status={record.status} />
            </div>
          </div>
        </div>

        {/* Employee Info Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            padding: '14px 18px',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Employee Name
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
              {record.employeeName}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Employee ID
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--royal-indigo)', fontFamily: 'monospace', marginTop: '3px' }}>
              {record.employeeId}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Department
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
              {record.department}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Designation
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
              {record.designation}
            </div>
          </div>
        </div>

        {/* 2-Column Earnings & Deductions Tables */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Earnings Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: 'var(--royal-indigo-light)',
                fontWeight: '800',
                fontSize: '12px',
                color: 'var(--royal-indigo)',
                borderBottom: '1px solid var(--border-subtle)',
                letterSpacing: '0.04em',
              }}
            >
              EARNINGS & ALLOWANCES
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Basic Salary</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.basicSalary)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>HRA (House Rent Allowance)</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.hra)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Transport Allowance</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.transportAllowance)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Medical Allowance</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.medicalAllowance)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Other Allowances</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.otherAllowances)}</span>
              </div>
              <div
                style={{
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px dashed var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '800',
                  color: 'var(--royal-indigo)',
                  fontSize: '13.5px',
                }}
              >
                <span>Gross Earnings</span>
                <span>{formatCurrency(record.grossSalary)}</span>
              </div>
            </div>
          </div>

          {/* Deductions Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: 'var(--status-danger-bg)',
                fontWeight: '800',
                fontSize: '12px',
                color: 'var(--status-danger)',
                borderBottom: '1px solid var(--border-subtle)',
                letterSpacing: '0.04em',
              }}
            >
              DEDUCTIONS & TAXES
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Provident Fund (PF)</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.pf)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Professional Tax</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.professionalTax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Income Tax (TDS)</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.incomeTax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Leave Deductions</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.leaveDeduction)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Other Deductions</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(record.otherDeductions)}</span>
              </div>
              <div
                style={{
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px dashed var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '800',
                  color: 'var(--status-danger)',
                  fontSize: '13.5px',
                }}
              >
                <span>Total Deductions</span>
                <span>-{formatCurrency(record.totalDeductions)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Salary Summary Banner */}
        <div
          style={{
            padding: '18px 22px',
            backgroundColor: 'var(--champagne-gold-light)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--midnight-navy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              NET TAKE HOME SALARY
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Gross Earnings ({formatCurrency(record.grossSalary)}) - Total Deductions ({formatCurrency(record.totalDeductions)})
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--midnight-navy)' }}>
            {formatCurrency(record.netSalary)}
          </div>
        </div>

        {/* Modal Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '4px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="nexus-btn-secondary"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="nexus-btn-gold"
            style={{
              padding: '9px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🖨 Print Payslip
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SalaryBreakdown;
