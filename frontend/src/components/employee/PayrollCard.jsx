import React from 'react';
import { DollarSign, Award, Percent, Calendar } from 'lucide-react';

const PayrollCard = ({ payroll }) => {
  const formattedNetSalary = payroll?.netSalary
    ? `₹${payroll.netSalary.toLocaleString('en-IN')}`
    : '₹0';
  const formattedBasic = payroll?.basicSalary
    ? `₹${payroll.basicSalary.toLocaleString('en-IN')}`
    : '₹0';
  const formattedGross = payroll?.grossSalary
    ? `₹${payroll.grossSalary.toLocaleString('en-IN')}`
    : '₹0';
  const formattedDeductions = payroll?.totalDeductions
    ? `₹${payroll.totalDeductions.toLocaleString('en-IN')}`
    : '₹0';

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Payroll Overview</h3>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Pay Period: {payroll?.month || 'Current Month'}
          </span>
        </div>
        <span className="badge badge-approved">
          {payroll?.paymentStatus || 'PAID'}
        </span>
      </div>

      <div
        style={{
          backgroundColor: 'var(--primary-50)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid var(--primary-100)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: '13px', color: 'var(--primary-700)', fontWeight: '600', textTransform: 'uppercase' }}>
            Net Salary Payable
          </span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-700)', marginTop: '4px' }}>
            {formattedNetSalary}
          </div>
        </div>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-600)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <DollarSign size={24} />
        </div>
      </div>

      <div className="grid-3">
        <div style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>BASIC SALARY</span>
          <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{formattedBasic}</div>
        </div>
        <div style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>GROSS SALARY</span>
          <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{formattedGross}</div>
        </div>
        <div style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL DEDUCTIONS</span>
          <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px', color: 'var(--danger-text)' }}>
            {formattedDeductions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollCard;
