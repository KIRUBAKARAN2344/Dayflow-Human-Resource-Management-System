import React from 'react';
import { ArrowRightIcon, AttendanceIcon } from '../../common/Icons';

const RecentAttendance = ({ records, onViewAll }) => {
  // Demo mock data
  const defaultRecords = [
    {
      id: 1,
      name: 'Alexander Wright',
      department: 'Engineering',
      time: '08:45 AM',
      location: 'HQ Office',
      status: 'Present',
      avatarColor: '#1D4ED8',
    },
    {
      id: 2,
      name: 'Sophia Martinez',
      department: 'Human Resources',
      time: '09:02 AM',
      location: 'HQ Office',
      status: 'Present',
      avatarColor: '#059669',
    },
    {
      id: 3,
      name: 'Marcus Chen',
      department: 'Product Design',
      time: '09:28 AM',
      location: 'Remote',
      status: 'Late',
      avatarColor: '#D97706',
    },
    {
      id: 4,
      name: 'Emily Davis',
      department: 'Marketing',
      time: '08:50 AM',
      location: 'HQ Office',
      status: 'Present',
      avatarColor: '#7C3AED',
    },
    {
      id: 5,
      name: 'David Kim',
      department: 'Finance',
      time: '-',
      location: 'Remote',
      status: 'On Leave',
      avatarColor: '#DC2626',
    },
  ];

  const list = records || defaultRecords;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return {
          bg: 'var(--status-success-bg)',
          color: 'var(--status-success)',
          border: 'rgba(22, 134, 106, 0.2)',
        };
      case 'Late':
        return {
          bg: 'var(--status-warning-bg)',
          color: 'var(--status-warning)',
          border: 'rgba(200, 138, 26, 0.2)',
        };
      case 'On Leave':
        return {
          bg: 'rgba(201, 162, 39, 0.12)',
          color: 'var(--champagne-gold)',
          border: 'rgba(201, 162, 39, 0.3)',
        };
      default:
        return {
          bg: 'var(--status-danger-bg)',
          color: 'var(--status-danger)',
          border: 'rgba(201, 76, 76, 0.2)',
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        padding: '22px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: 'rgba(23, 29, 56, 0.06)',
              color: 'var(--royal-indigo)',
            }}
          >
            <AttendanceIcon size={18} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Recent Attendance
          </h3>
        </div>

        <button
          onClick={onViewAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: 'none',
            color: 'var(--champagne-gold)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span>View All</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>

      {/* Table List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {list.map((item) => {
          const badge = getStatusBadge(item.status);
          const initials = item.name
            .split(' ')
            .map((n) => n[0])
            .join('');

          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #F1F5F9',
                backgroundColor: 'var(--bg-main)',
                transition: 'background-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
            >
              {/* Employee Avatar & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: item.avatarColor,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '700',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {item.department} • {item.location}
                  </div>
                </div>
              </div>

              {/* Time & Status Badge */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    backgroundColor: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.status}
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '500' }}>
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentAttendance;
