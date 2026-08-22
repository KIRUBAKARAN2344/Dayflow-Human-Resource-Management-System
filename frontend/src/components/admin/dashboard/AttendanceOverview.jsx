import React from 'react';
import { AttendanceIcon, ClockIcon, LeaveIcon, ShieldIcon } from '../../common/Icons';

const AttendanceOverview = ({ data }) => {
  // Default mock data if props not passed
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
      icon: AttendanceIcon,
    },
    {
      label: 'Late Check-ins',
      count: stats.late,
      percentage: ((stats.late / stats.total) * 100).toFixed(1),
      color: 'var(--status-warning)',
      bgColor: 'var(--status-warning-bg)',
      icon: ClockIcon,
    },
    {
      label: 'On Approved Leave',
      count: stats.onLeave,
      percentage: ((stats.onLeave / stats.total) * 100).toFixed(1),
      color: 'var(--champagne-gold)',
      bgColor: 'rgba(201, 162, 39, 0.1)',
      icon: LeaveIcon,
    },
    {
      label: 'Unexcused Absences',
      count: stats.absent,
      percentage: ((stats.absent / stats.total) * 100).toFixed(1),
      color: 'var(--status-danger)',
      bgColor: 'var(--status-danger-bg)',
      icon: ShieldIcon,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '28px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
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
            borderRadius: '20px',
            backgroundColor: 'var(--navy-deep)',
            color: '#FFFFFF',
            fontSize: '12.5px',
            fontWeight: '600',
            border: '1px solid var(--champagne-gold)',
          }}
        >
          <span style={{ color: 'var(--champagne-gold)', fontWeight: '700' }}>Overall Rate:</span>
          <span>{stats.attendanceRate}%</span>
        </div>
      </div>

      {/* Segmented Visual Progress Bar */}
      <div
        style={{
          height: '12px',
          borderRadius: '6px',
          backgroundColor: '#E2E8F0',
          display: 'flex',
          overflow: 'hidden',
          marginBottom: '24px',
          gap: '2px',
        }}
      >
        {metrics.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: `${item.percentage}%`,
              backgroundColor: item.color,
              transition: 'width 0.5s ease',
            }}
            title={`${item.label}: ${item.count} (${item.percentage}%)`}
          />
        ))}
      </div>

      {/* 4 Metric Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              style={{
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: metric.bgColor,
                  color: metric.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                  {metric.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {metric.count}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: metric.color }}>
                    ({metric.percentage}%)
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
