import React from 'react';
import { AttendanceIcon, ClockIcon, LeaveIcon, ShieldIcon } from '../../common/Icons';

const AttendanceOverview = ({ data }) => {
  const stats = data || {
    total: 248,
    present: 218,
    late: 8,
    absent: 12,
    onLeave: 10,
    attendanceRate: 87.9,
  };

  const metrics = [
    {
      label: 'Present On-Time',
      count: stats.present,
      percentage: ((stats.present / stats.total) * 100).toFixed(1),
      color: 'var(--status-success)',
      bgColor: 'var(--status-success-bg)',
      borderColor: 'var(--status-success-border)',
      icon: AttendanceIcon,
    },
    {
      label: 'Late Check-ins',
      count: stats.late,
      percentage: ((stats.late / stats.total) * 100).toFixed(1),
      color: 'var(--status-warning)',
      bgColor: 'var(--status-warning-bg)',
      borderColor: 'var(--status-warning-border)',
      icon: ClockIcon,
    },
    {
      label: 'On Approved Leave',
      count: stats.onLeave,
      percentage: ((stats.onLeave / stats.total) * 100).toFixed(1),
      color: 'var(--champagne-gold)',
      bgColor: 'var(--champagne-gold-light)',
      borderColor: 'rgba(212, 175, 55, 0.3)',
      icon: LeaveIcon,
    },
    {
      label: 'Unexcused Absences',
      count: stats.absent,
      percentage: ((stats.absent / stats.total) * 100).toFixed(1),
      color: 'var(--status-danger)',
      bgColor: 'var(--status-danger-bg)',
      borderColor: 'var(--status-danger-border)',
      icon: ShieldIcon,
    },
  ];

  return (
    <div
      className="nexus-card"
      style={{
        padding: '24px 26px',
        marginBottom: '28px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Today's Attendance Analytics
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Real-time workforce attendance distribution and compliance rate
          </p>
        </div>

        {/* Overall Attendance Rate Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            background: 'linear-gradient(135deg, var(--midnight-navy) 0%, var(--navy-card) 100%)',
            color: '#FFFFFF',
            fontSize: '12.5px',
            fontWeight: '600',
            border: '1px solid var(--border-dark)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span style={{ color: 'var(--champagne-gold)', fontWeight: '700' }}>Overall Rate:</span>
          <span style={{ fontWeight: '800', color: 'var(--electric-blue)' }}>{stats.attendanceRate}%</span>
        </div>
      </div>

      {/* Segmented Visual Progress Bar */}
      <div
        style={{
          height: '10px',
          borderRadius: 'var(--radius-pill)',
          backgroundColor: 'var(--border-subtle)',
          display: 'flex',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            width: `${(stats.present / stats.total) * 100}%`,
            background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
            transition: 'width var(--transition-normal)',
          }}
          title={`Present: ${stats.present}`}
        />
        <div
          style={{
            width: `${(stats.late / stats.total) * 100}%`,
            background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
            transition: 'width var(--transition-normal)',
          }}
          title={`Late: ${stats.late}`}
        />
        <div
          style={{
            width: `${(stats.onLeave / stats.total) * 100}%`,
            background: 'linear-gradient(90deg, #D4AF37 0%, #FDE047 100%)',
            transition: 'width var(--transition-normal)',
          }}
          title={`Leave: ${stats.onLeave}`}
        />
        <div
          style={{
            width: `${(stats.absent / stats.total) * 100}%`,
            background: 'linear-gradient(90deg, #EF4444 0%, #F87171 100%)',
            transition: 'width var(--transition-normal)',
          }}
          title={`Absent: ${stats.absent}`}
        />
      </div>

      {/* 4 Breakdown Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-main)',
                border: `1px solid ${m.borderColor}`,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: m.bgColor,
                  color: m.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                  {m.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    {m.count}
                  </span>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '600' }}>
                    ({m.percentage}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceOverview;
