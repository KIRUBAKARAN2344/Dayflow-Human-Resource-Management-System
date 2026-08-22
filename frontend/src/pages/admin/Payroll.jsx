import React, { useState } from 'react';
import usePayroll from '../../hooks/usePayroll';
import PageHeader from '../../components/common/PageHeader';
import PayrollSummary from '../../components/admin/payroll/PayrollSummary';
import PayrollFilters from '../../components/admin/payroll/PayrollFilters';
import PayrollTable from '../../components/admin/payroll/PayrollTable';
import SalaryBreakdown from '../../components/admin/payroll/SalaryBreakdown';
import SalaryForm from '../../components/admin/payroll/SalaryForm';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { PayrollIcon } from '../../components/common/Icons';

// Toast Notification Helper
const Toast = ({ message, type }) => {
  if (!message) return null;
  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        padding: '14px 20px',
        borderRadius: '10px',
        backgroundColor: type === 'success' ? 'var(--status-success)' : 'var(--status-danger)',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: '13.5px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        zIndex: 9999,
        maxWidth: '360px',
      }}
    >
      {type === 'success' ? '✓ ' : '⚠ '}{message}
    </div>
  );
};

const Payroll = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    paginatedRecords,
    stats,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    salaryRangeFilter,
    setSalaryRangeFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalRecordsCount,
    resetFilters,
    processMonthPayroll,
    refresh,
  } = usePayroll();

  // Modal States
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isPayslipOpen, setIsPayslipOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000);
  };

  const handleOpenPayslip = (record) => {
    setSelectedRecord(record);
    setIsPayslipOpen(true);
  };

  const handleClosePayslip = () => {
    setIsPayslipOpen(false);
    setSelectedRecord(null);
  };

  const handleConfirmProcess = async () => {
    setIsProcessing(true);
    showToast(`Payroll processing started for ${selectedMonth}...`, 'success');
    try {
      await processMonthPayroll();
      setIsProcessModalOpen(false);
      showToast(`${selectedMonth} payroll processed successfully.`, 'success');
    } catch (err) {
      showToast('Unable to process payroll. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const isAllProcessed = stats && stats.pendingCount === 0;

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Payroll Management"
        description="Manage employee salaries, allowances, deductions, and payslip processing."
        breadcrumb="Finance & HR / Payroll"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={refresh}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              ↻ Refresh
            </button>

            <button
              onClick={() => setIsProcessModalOpen(true)}
              disabled={isAllProcessed}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: isAllProcessed ? '#CBD5E1' : 'var(--navy-deep)',
                color: isAllProcessed ? '#64748B' : 'var(--champagne-gold)',
                border: isAllProcessed ? '1px solid #CBD5E1' : '1px solid var(--champagne-gold)',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: isAllProcessed ? 'not-allowed' : 'pointer',
                boxShadow: isAllProcessed ? 'none' : 'var(--shadow-sm)',
              }}
            >
              <PayrollIcon size={16} />
              <span>{isAllProcessed ? 'Payroll Processed' : 'Process Payroll'}</span>
            </button>
          </div>
        }
      />

      {/* Summary KPI Cards & Statistics */}
      <PayrollSummary stats={stats} />

      {/* Filters Toolbar */}
      <PayrollFilters
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        salaryRangeFilter={salaryRangeFilter}
        onSalaryRangeChange={setSalaryRangeFilter}
        onReset={resetFilters}
      />

      {/* Loading & Error States */}
      {loading && <Loading message="Loading payroll records..." />}
      {error && <ErrorMessage message={error} onRetry={refresh} />}

      {/* Main Payroll Table */}
      {!loading && (
        <PayrollTable
          records={paginatedRecords}
          onViewPayslip={handleOpenPayslip}
          onResetFilters={resetFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalCount={totalRecordsCount}
        />
      )}

      {/* Payslip Details Modal */}
      <SalaryBreakdown
        isOpen={isPayslipOpen}
        onClose={handleClosePayslip}
        record={selectedRecord}
      />

      {/* Process Payroll Confirmation Modal */}
      <SalaryForm
        isOpen={isProcessModalOpen}
        onClose={() => setIsProcessModalOpen(false)}
        onConfirm={handleConfirmProcess}
        month={selectedMonth}
        stats={stats}
        isSubmitting={isProcessing}
      />

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
};

export default Payroll;
