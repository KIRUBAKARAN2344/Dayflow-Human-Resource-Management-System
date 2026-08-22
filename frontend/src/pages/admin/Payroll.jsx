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
        borderRadius: 'var(--radius-md)',
        backgroundColor: type === 'success' ? 'var(--status-success)' : 'var(--status-danger)',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: '13.5px',
        boxShadow: 'var(--shadow-lg)',
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
    <div className="animate-fade-in">
      {/* Page Header */}
      <PageHeader
        title="Payroll & Compensation"
        description="Oversee workforce compensation, tax deductions, and executive payslip disbursals."
        breadcrumb="Finance / Payroll"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={refresh}
              className="nexus-btn-secondary"
              style={{
                padding: '9px 16px',
                fontSize: '13px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              ↻ Refresh
            </button>

            <button
              type="button"
              onClick={() => setIsProcessModalOpen(true)}
              disabled={isAllProcessed}
              className={isAllProcessed ? 'nexus-btn-secondary' : 'nexus-btn-primary'}
              style={{
                padding: '9px 20px',
                fontSize: '13px',
                borderRadius: 'var(--radius-md)',
                opacity: isAllProcessed ? 0.6 : 1,
                cursor: isAllProcessed ? 'not-allowed' : 'pointer',
              }}
            >
              <PayrollIcon size={16} />
              <span>{isAllProcessed ? 'Payroll Finalized' : 'Process Payroll'}</span>
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

      {/* Payroll Table */}
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

      {/* Payslip Breakdown Modal */}
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

      {/* Toast */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
};

export default Payroll;
