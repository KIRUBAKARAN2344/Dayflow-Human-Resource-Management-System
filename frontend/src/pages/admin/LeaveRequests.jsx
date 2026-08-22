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

// ── Summary KPI Card ──────────────────────────────────────────────
const SummaryCard = ({ title, count, subtitle, icon: Icon, accent, badgeBg }) => (
  <div
    className="nexus-card nexus-card-interactive"
    style={{
      padding: '18px 20px',
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
      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '500' }}>{subtitle}</div>
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
        boxShadow: `0 2px 8px ${badgeBg}`,
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
      className="nexus-card"
      style={{
        padding: '18px 22px',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          Leave Request Approval Distribution
        </span>
        <span
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--status-success)',
            backgroundColor: 'var(--status-success-bg)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--status-success-border)',
          }}
        >
          {approvedPct}% Approval Rate
        </span>
      </div>

      <div style={{ height: '10px', borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--border-subtle)', display: 'flex', overflow: 'hidden', gap: '2px', marginBottom: '14px' }}>
        <div style={{ width: `${approvedPct}%`, background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)', transition: 'width var(--transition-normal)' }} title={`Approved: ${approvedPct}%`} />
        <div style={{ width: `${pendingPct}%`, background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)', transition: 'width var(--transition-normal)' }} title={`Pending: ${pendingPct}%`} />
        <div style={{ width: `${rejectedPct}%`, background: 'linear-gradient(90deg, #EF4444 0%, #F87171 100%)', transition: 'width var(--transition-normal)' }} title={`Rejected: ${rejectedPct}%`} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', flexWrap: 'wrap' }}>
        {[
          { label: `Approved (${approvedPct}%)`, color: 'var(--status-success)' },
          { label: `Pending (${pendingPct}%)`, color: 'var(--status-warning)' },
          { label: `Rejected (${rejectedPct}%)`, color: 'var(--status-danger)' },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
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
    { title: 'Total Requests', count: stats?.total, subtitle: 'All leave submissions', icon: LeaveIcon, accent: 'var(--royal-indigo)', badgeBg: 'var(--royal-indigo-light)' },
    { title: 'Pending', count: stats?.pending, subtitle: 'Awaiting HR decision', icon: ClockIcon, accent: 'var(--status-warning)', badgeBg: 'var(--status-warning-bg)' },
    { title: 'Approved', count: stats?.approved, subtitle: 'Successfully approved', icon: AttendanceIcon, accent: 'var(--status-success)', badgeBg: 'var(--status-success-bg)' },
    { title: 'Rejected', count: stats?.rejected, subtitle: 'Not approved by HR', icon: ShieldIcon, accent: 'var(--status-danger)', badgeBg: 'var(--status-danger-bg)' },
    { title: 'On Leave Today', count: stats?.onLeaveToday, subtitle: 'Currently on approved leave', icon: EmployeesIcon, accent: 'var(--champagne-gold)', badgeBg: 'var(--champagne-gold-light)' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <PageHeader
        title="Leave Management"
        description="Review, approve, and reject workforce leave requests with full HR executive workflow."
        breadcrumb="Operations / Leave Management"
        actionButton={
          <button
            type="button"
            onClick={refresh}
            className="nexus-btn-secondary"
            style={{
              padding: '9px 18px',
              fontSize: '13px',
              borderRadius: 'var(--radius-md)',
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
