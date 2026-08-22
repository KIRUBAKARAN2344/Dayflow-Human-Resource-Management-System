import React from 'react';
import Modal from '../../common/Modal';
import { formatCurrency } from '../../../utils/formatCurrency';

const SalaryForm = ({ isOpen, onClose, onConfirm, month, stats, isSubmitting }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Process Payroll — ${month}`}
      maxWidth="500px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: 0, lineHeight: '1.5' }}>
          Are you sure you want to process payroll for <strong>{month}</strong>?
        </p>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--bg-main)',
            borderRadius: '10px',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '13px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Eligible Employees:</span>
            <strong style={{ color: 'var(--text-primary)' }}>{stats?.totalEmployees || 0}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Net Disbursal:</span>
            <strong style={{ color: 'var(--champagne-gold)' }}>
              {formatCurrency(stats?.totalNet || 0)}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Pending Records to Finalize:</span>
            <strong style={{ color: 'var(--status-warning)' }}>{stats?.pendingCount || 0}</strong>
          </div>
        </div>

        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            borderRadius: '8px',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            fontSize: '12.5px',
            color: 'var(--status-info)',
            lineHeight: '1.4',
          }}
        >
          ℹ️ Processing will finalize all employee salary computations and generate official payslips for this cycle.
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              padding: '9px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              border: '1px solid var(--champagne-gold)',
              backgroundColor: 'var(--navy-deep)',
              color: 'var(--champagne-gold)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Processing...' : 'Confirm & Process Payroll'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SalaryForm;
