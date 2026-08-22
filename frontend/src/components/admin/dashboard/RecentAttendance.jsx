import React from 'react';
import { ArrowRightIcon, AttendanceIcon } from '../../common/Icons';

const RecentAttendance = ({ records, onViewAll }) => {
  const defaultRecords = [
    {
      id: 1,
      name: 'Alexander Wright',
      department: 'Engineering',
      time: '08:45 AM',
      location: 'HQ Office',
      status: 'Present',
      avatarColor: 'var(--royal-indigo)',
    },
    {
      id: 2,
      name: 'Sophia Martinez',
      department: 'Human Resources',
      time: '09:02 AM',
      location: 'HQ Office',
      status: 'Present',
      avatarColor: '#10B981',
    },
    {
      id: 3,
      name: 'Marcus Chen',
      department: 'Product Design',
      time: '09:28 AM',
      location: 'Remote',
      status: 'Late',
      avatarColor: '#F59E0B',
    },
    {
      id: 4,
      name: 'Emily Davis',
      department: 'Marketing',
      time: '08:50 AM',
      location: 'HQ Office',
      status: 'Present',
      avatarColor: '#7C5CFC',
    },
    {
      id: 5,
      name: 'David Kim',
      department: 'Finance',
      time: '-',
      location: 'Remote',
      status: 'On Leave',
      avatarColor: '#D4AF37',
    },
  ];

  const list = records || defaultRecords;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return {
          bg: 'var(--status-success-bg)',
          color: 'var(--status-success)',
          border: 'var(--status-success-border)',
        };
      case 'Late':
        return {
          bg: 'var(--status-warning-bg)',
          color: 'var(--status-warning)',
          border: 'var(--status-warning-border)',
        };
      case 'On Leave':
        return {
          bg: 'var(--champagne-gold-light)',
          color: 'var(--champagne-gold)',
          border: 'rgba(212, 175, 55, 0.3)',
        };
      default:
        return {
          bg: 'var(--status-danger-bg)',
          color: 'var(--status-danger)',
          border: 'var(--status-danger-border)',
        };
    }
  };

  return (
    <div
      className="nexus-card"
      style={{
        padding: '22px 24px',
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
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: 'var(--royal-indigo-light)',
              color: 'var(--royal-indigo)',
              border: '1px solid rgba(91, 95, 239, 0.2)',
            }}
          >
            <AttendanceIcon size={18} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
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
            color: 'var(--royal-indigo)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'background-color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--royal-indigo-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <span>View All</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>

      {/* Table List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
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
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-main)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(91, 95, 239, 0.2)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Employee Avatar & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: item.avatarColor,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
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
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.status}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
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
