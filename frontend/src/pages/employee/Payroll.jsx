import React, { useState, useEffect } from 'react';
import { payrollService } from '../../services/payrollService';
import { authService } from '../../services/authService';
import PayrollCard from '../../components/employee/PayrollCard';

const Payroll = () => {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayroll = async () => {
      setLoading(true);
      try {
        const currentUser = authService.getCurrentUser();
        const data = await payrollService.getMyPayroll(currentUser?.id);
        setPayroll(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch payroll information.');
      } finally {
        setLoading(false);
      }
    };
    fetchPayroll();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Payroll & Payslips</h1>
          <p className="page-subtitle">Inspect salary breakdown, allowances, and net pay</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Loading payroll details...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <PayrollCard payroll={payroll} />
      )}
    </div>
  );
};

export default Payroll;
