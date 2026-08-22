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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                padding: '10px 14px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
              }}
            >
              <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Attendance Remarks
            </div>
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                fontStyle: 'italic',
              }}
            >
              {record.remarks}
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--champagne-gold)',
              backgroundColor: 'var(--navy-deep)',
              color: 'var(--champagne-gold)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Close
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

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Attendance Management"
        description={`Monitor and manage employee attendance — ${today}`}
        breadcrumb="HR Operations / Attendance"
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

      {/* KPI Summary Cards + Statistics Bar */}
      <AttendanceSummary stats={stats} />

      {/* Filters Toolbar */}
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

      {/* Attendance Table */}
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

      {/* Attendance Details Modal */}
      <AttendanceDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
};

export default Attendance;
