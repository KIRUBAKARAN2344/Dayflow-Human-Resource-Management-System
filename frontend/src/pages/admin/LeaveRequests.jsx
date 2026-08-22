import React, { useState } from 'react';
import useLeave from '../../hooks/useLeave';
import PageHeader from '../../components/common/PageHeader';
import LeaveTable from '../../components/admin/leave/LeaveTable';
import LeaveFilters from '../../components/admin/leave/LeaveFilters';
import LeaveActionModal from '../../components/admin/leave/LeaveActionModal';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  LeaveIcon,
  ClockIcon,
  AttendanceIcon,
  ShieldIcon,
  EmployeesIcon,
} from '../../components/common/Icons';

// ── Inline Toast Notification ─────────────────────────────────────
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
        maxWidth: '340px',
      }}
    >
      {type === 'success' ? '✓ ' : '⚠ '}{message}
    </div>
  );
};

// ── Summary KPI Card ──────────────────────────────────────────────
const SummaryCard = ({ title, count, subtitle, icon: Icon, accent, badgeBg }) => (
  <div
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid var(--border-light)',
      padding: '18px 20px',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: accent,
      }}
    />
    <div>
      <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {title}
      </div>
      <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginTop: '2px', lineHeight: '1.1' }}>
        {count ?? '—'}
      </div>
      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>{subtitle}</div>
    </div>
    <div
      style={{
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        backgroundColor: badgeBg,
        color: accent,
        border: `1px solid ${accent}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={20} />
    </div>
  </div>
);

// ── Leave Statistics Progress Section ─────────────────────────────
const LeaveStatsBar = ({ stats }) => {
  if (!stats || stats.total === 0) return null;
  const total = stats.total;
  const approvedPct = ((stats.approved / total) * 100).toFixed(1);
  const pendingPct = ((stats.pending / total) * 100).toFixed(1);
  const rejectedPct = ((stats.rejected / total) * 100).toFixed(1);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--border-light)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Leave Request Distribution
        </span>
        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--champagne-gold)' }}>
          Approval Rate: {approvedPct}%
        </span>
      </div>

      <div style={{ height: '10px', borderRadius: '5px', backgroundColor: '#E2E8F0', display: 'flex', overflow: 'hidden', gap: '2px', marginBottom: '12px' }}>
        <div style={{ width: `${approvedPct}%`, backgroundColor: 'var(--status-success)' }} title={`Approved: ${approvedPct}%`} />
        <div style={{ width: `${pendingPct}%`, backgroundColor: 'var(--status-warning)' }} title={`Pending: ${pendingPct}%`} />
        <div style={{ width: `${rejectedPct}%`, backgroundColor: 'var(--status-danger)' }} title={`Rejected: ${rejectedPct}%`} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', flexWrap: 'wrap' }}>
        {[
          { label: `Approved (${approvedPct}%)`, color: 'var(--status-success)' },
          { label: `Pending (${pendingPct}%)`, color: 'var(--status-warning)' },
          { label: `Rejected (${rejectedPct}%)`, color: 'var(--status-danger)' },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main LeaveRequests Page ───────────────────────────────────────
const LeaveRequests = () => {
  const {
    filteredRecords,
    paginatedRecords,
    stats,
    loading,
    error,
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    leaveTypeFilter, setLeaveTypeFilter,
    departmentFilter, setDepartmentFilter,
    dateFilter, setDateFilter,
    currentPage, setCurrentPage,
    totalPages,
    totalRecordsCount,
    resetFilters,
    approveRequest,
    rejectRequest,
    refresh,
  } = useLeave();

  // Modal State
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view' | 'approve' | 'reject'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3500);
  };

  const openModal = (record, mode) => {
    setSelectedRecord(record);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleApproveConfirm = async (id) => {
    setIsSubmitting(true);
    try {
      await approveRequest(id);
      closeModal();
      showToast('Leave request approved successfully.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to approve leave.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectConfirm = async (id, reason) => {
    setIsSubmitting(true);
    try {
      await rejectRequest(id, reason);
      closeModal();
      showToast('Leave request rejected successfully.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to reject leave.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const summaryCards = [
    { title: 'Total Requests', count: stats?.total, subtitle: 'All leave submissions', icon: LeaveIcon, accent: 'var(--royal-indigo)', badgeBg: 'rgba(23,29,56,0.08)' },
    { title: 'Pending', count: stats?.pending, subtitle: 'Awaiting HR decision', icon: ClockIcon, accent: 'var(--status-warning)', badgeBg: 'var(--status-warning-bg)' },
    { title: 'Approved', count: stats?.approved, subtitle: 'Successfully approved', icon: AttendanceIcon, accent: 'var(--status-success)', badgeBg: 'var(--status-success-bg)' },
    { title: 'Rejected', count: stats?.rejected, subtitle: 'Not approved by HR', icon: ShieldIcon, accent: 'var(--status-danger)', badgeBg: 'var(--status-danger-bg)' },
    { title: 'On Leave Today', count: stats?.onLeaveToday, subtitle: 'Currently on approved leave', icon: EmployeesIcon, accent: 'var(--champagne-gold)', badgeBg: 'rgba(201,162,39,0.12)' },
  ];

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Leave Management"
        description="Review, approve, and reject employee leave requests with full HR workflow."
        breadcrumb="HR Operations / Leave Management"
        actionButton={
          <button
            onClick={refresh}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--navy-deep)',
              color: 'var(--champagne-gold)',
              border: '1px solid var(--champagne-gold)',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            ↻ Refresh
          </button>
        }
      />

      {/* Summary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      {/* Leave Stats Distribution Bar */}
      <LeaveStatsBar stats={stats} />

      {/* Filters Toolbar */}
      <LeaveFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        leaveTypeFilter={leaveTypeFilter}
        onLeaveTypeChange={setLeaveTypeFilter}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        onReset={resetFilters}
      />

      {/* Loading & Error */}
      {loading && <Loading message="Loading leave requests..." />}
      {error && <ErrorMessage message={error} onRetry={refresh} />}

      {/* Leave Request Table */}
      {!loading && (
        <LeaveTable
          records={paginatedRecords}
          onView={(rec) => openModal(rec, 'view')}
          onApprove={(rec) => openModal(rec, 'approve')}
          onReject={(rec) => openModal(rec, 'reject')}
          onResetFilters={resetFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalCount={totalRecordsCount}
        />
      )}

      {/* Leave Action Modal */}
      <LeaveActionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        record={selectedRecord}
        mode={modalMode}
        onApproveConfirm={handleApproveConfirm}
        onRejectConfirm={handleRejectConfirm}
        isSubmitting={isSubmitting}
      />

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
};

export default LeaveRequests;
