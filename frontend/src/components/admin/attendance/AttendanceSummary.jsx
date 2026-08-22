import React from 'react';
import {
  EmployeesIcon,
  AttendanceIcon,
  ClockIcon,
  LeaveIcon,
  ShieldIcon
} from '../../common/Icons';

const AttendanceSummary = ({ stats }) => {
  const defaultStats = {
    total: 248,
    presentToday: 218,
    absentToday: 12,
    lateToday: 8,
    onLeave: 10,
    attendanceRate: 87.9,
  };

  const data = stats || defaultStats;

  const cards = [
    {
      title: 'TOTAL EMPLOYEES',
      count: data.total,
      subtitle: 'Organization Workforce',
      icon: EmployeesIcon,
      accent: 'var(--royal-indigo)',
      badgeBg: 'rgba(23, 29, 56, 0.08)',
    },
    {
      title: 'PRESENT TODAY',
      count: data.presentToday,
      subtitle: `${((data.presentToday / data.total) * 100).toFixed(1)}% attendance rate`,
      icon: AttendanceIcon,
      accent: 'var(--status-success)',
      badgeBg: 'var(--status-success-bg)',
    },
    {
      title: 'ABSENT TODAY',
      count: data.absentToday,
      subtitle: `${((data.absentToday / data.total) * 100).toFixed(1)}% unexcused`,
      icon: ShieldIcon,
      accent: 'var(--status-danger)',
      badgeBg: 'var(--status-danger-bg)',
    },
    {
      title: 'LATE TODAY',
      count: data.lateToday,
      subtitle: `${((data.lateToday / data.total) * 100).toFixed(1)}% late check-ins`,
      icon: ClockIcon,
      accent: 'var(--status-warning)',
      badgeBg: 'var(--status-warning-bg)',
    },
    {
      title: 'ON LEAVE',
      count: data.onLeave,
      subtitle: `${((data.onLeave / data.total) * 100).toFixed(1)}% approved leave`,
      icon: LeaveIcon,
      accent: 'var(--champagne-gold)',
      badgeBg: 'rgba(201, 162, 39, 0.12)',
    },
  ];

  const presentPct = ((data.presentToday / data.total) * 100).toFixed(1);
  const absentPct = ((data.absentToday / data.total) * 100).toFixed(1);
  const latePct = ((data.lateToday / data.total) * 100).toFixed(1);
  const leavePct = ((data.onLeave / data.total) * 100).toFixed(1);

  return (
    <div style={{ marginBottom: '28px' }}>
      {/* 5 Summary KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
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
              {/* Top Accent Stripe */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: card.accent,
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: '26px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginTop: '2px',
                    lineHeight: '1.1',
                  }}
                >
                  {card.count}
                </div>
                <div
                  style={{
                    fontSize: '11.5px',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    fontWeight: '500',
                  }}
                >
                  {card.subtitle}
                </div>
              </div>

              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: card.badgeBg,
                  color: card.accent,
                  border: `1px solid ${card.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Attendance Statistics Progress Breakdown */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border-light)',
          padding: '16px 20px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Daily Attendance Distribution Rate
          </span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--champagne-gold)' }}>
            {data.attendanceRate}% Compliance Rate
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div
          style={{
            height: '10px',
            borderRadius: '5px',
            backgroundColor: '#E2E8F0',
            display: 'flex',
            overflow: 'hidden',
            gap: '2px',
            marginBottom: '12px',
          }}
        >
          <div style={{ width: `${presentPct}%`, backgroundColor: 'var(--status-success)' }} title={`Present: ${presentPct}%`} />
          <div style={{ width: `${latePct}%`, backgroundColor: 'var(--status-warning)' }} title={`Late: ${latePct}%`} />
          <div style={{ width: `${leavePct}%`, backgroundColor: 'var(--champagne-gold)' }} title={`On Leave: ${leavePct}%`} />
          <div style={{ width: `${absentPct}%`, backgroundColor: 'var(--status-danger)' }} title={`Absent: ${absentPct}%`} />
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-success)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Present ({presentPct}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-warning)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Late ({latePct}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--champagne-gold)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>On Leave ({leavePct}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-danger)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Absent ({absentPct}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
