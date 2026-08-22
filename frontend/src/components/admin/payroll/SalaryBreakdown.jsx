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
            padding: '16px 20px',
            backgroundColor: 'var(--navy-deep)',
            color: '#FFFFFF',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--champagne-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              DAYFLOW HUMAN RESOURCE MANAGEMENT SYSTEM
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', marginTop: '2px', color: '#FFFFFF' }}>
              Employee Salary Payslip
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--champagne-gold)' }}>
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
            borderRadius: '10px',
            border: '1px solid var(--border-light)',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Employee Name
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
              {record.employeeName}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Employee ID
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--royal-indigo)', fontFamily: 'monospace', marginTop: '2px' }}>
              {record.employeeId}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Department
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
              {record.department}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Designation
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
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
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(23, 29, 56, 0.05)',
                fontWeight: '800',
                fontSize: '12.5px',
                color: 'var(--royal-indigo)',
                borderBottom: '1px solid var(--border-light)',
                letterSpacing: '0.04em',
              }}
            >
              EARNINGS & ALLOWANCES
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
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
                  borderTop: '1px dashed var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '800',
                  color: 'var(--status-info)',
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
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(201, 76, 76, 0.06)',
                fontWeight: '800',
                fontSize: '12.5px',
                color: 'var(--status-danger)',
                borderBottom: '1px solid var(--border-light)',
                letterSpacing: '0.04em',
              }}
            >
              DEDUCTIONS & TAXES
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
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
                  borderTop: '1px dashed var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '800',
                  color: 'var(--status-danger)',
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
            padding: '16px 20px',
            backgroundColor: 'rgba(201, 162, 39, 0.08)',
            border: '1px solid var(--champagne-gold)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--navy-deep)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              NET TAKE HOME SALARY
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Gross Earnings ({formatCurrency(record.grossSalary)}) - Total Deductions ({formatCurrency(record.totalDeductions)})
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--navy-deep)' }}>
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
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Close
          </button>

          <button
            type="button"
            onClick={handlePrint}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--champagne-gold)',
              backgroundColor: 'var(--navy-deep)',
              color: 'var(--champagne-gold)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
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
