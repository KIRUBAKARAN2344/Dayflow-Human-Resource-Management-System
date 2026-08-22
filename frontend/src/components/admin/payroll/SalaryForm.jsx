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
          Are you sure you want to finalize and process compensation payroll for <strong>{month}</strong>?
        </p>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
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
            <strong style={{ color: 'var(--champagne-gold)', fontWeight: '800' }}>
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
            backgroundColor: 'var(--status-info-bg)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--status-info-border)',
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
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="nexus-btn-secondary"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="nexus-btn-primary"
            style={{
              padding: '9px 20px',
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
