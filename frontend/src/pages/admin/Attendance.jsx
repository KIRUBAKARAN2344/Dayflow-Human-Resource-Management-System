import React, { useState } from 'react';
import useAttendance from '../../hooks/useAttendance';
import PageHeader from '../../components/common/PageHeader';
import AttendanceSummary from '../../components/admin/attendance/AttendanceSummary';
import AttendanceTable from '../../components/admin/attendance/AttendanceTable';
import AttendanceFilters from '../../components/admin/attendance/AttendanceFilters';
import AttendanceStatusBadge from '../../components/admin/attendance/AttendanceStatusBadge';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

// ── Attendance Details Modal ──────────────────────────────────────
const AttendanceDetailsModal = ({ isOpen, onClose, record }) => {
  if (!record) return null;

  const rows = [
    { label: 'Employee', value: record.employeeName },
    { label: 'Employee ID', value: record.employeeId },
    { label: 'Department', value: record.department },
    { label: 'Date', value: record.date },
    { label: 'Check In', value: record.checkIn },
    { label: 'Check Out', value: record.checkOut },
    { label: 'Break Duration', value: record.breakDuration },
    { label: 'Working Hours', value: record.workingHours },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Attendance Record Details" maxWidth="500px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
          <AttendanceStatusBadge status={record.status} />
        </div>

        {/* Info Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rows.map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {label}
              </span>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Remarks */}
        {record.remarks && (
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Attendance Remarks
            </div>
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                fontStyle: 'italic',
              }}
            >
              "{record.remarks}"
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            className="nexus-btn-primary"
            style={{
              padding: '9px 20px',
              fontSize: '13px',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Close Details
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ── Main Attendance Page ──────────────────────────────────────────
const Attendance = () => {
  const {
    paginatedRecords,
    stats,
    loading,
    error,
    searchTerm, setSearchTerm,
    dateFilter, setDateFilter,
    departmentFilter, setDepartmentFilter,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    totalPages,
    totalRecordsCount,
    resetFilters,
    refresh,
  } = useAttendance();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rec) => {
    setSelectedRecord(rec);
    setIsModalOpen(true);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <PageHeader
        title="Attendance Monitoring"
        description={`Organization-wide attendance tracking, logs, and compliance analytics for ${today}.`}
        breadcrumb="People / Attendance"
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
            ↻ Refresh Data
          </button>
        }
      />

      {/* Summary KPI Cards & Progress */}
      <AttendanceSummary stats={stats} />

      {/* Search and Filters Toolbar */}
      <AttendanceFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onReset={resetFilters}
      />

      {/* Loading & Error States */}
      {loading && <Loading message="Loading attendance records..." />}
      {error && <ErrorMessage message={error} onRetry={refresh} />}

      {/* Attendance Records Table */}
      {!loading && (
        <AttendanceTable
          records={paginatedRecords}
          onView={handleView}
          onResetFilters={resetFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalCount={totalRecordsCount}
        />
      )}

      {/* Record Details Modal */}
      <AttendanceDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
      />
    </div>
  );
};

export default Attendance;
