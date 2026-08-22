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
      badgeBg: 'var(--royal-indigo-light)',
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
      badgeBg: 'var(--champagne-gold-light)',
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
                  boxShadow: `0 2px 8px ${card.badgeBg}`,
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
        className="nexus-card"
        style={{
          padding: '18px 22px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Daily Attendance Compliance & Distribution
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--champagne-gold)',
              backgroundColor: 'var(--champagne-gold-light)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            {data.attendanceRate}% Compliance
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div
          style={{
            height: '10px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--border-subtle)',
            display: 'flex',
            overflow: 'hidden',
            gap: '2px',
            marginBottom: '14px',
          }}
        >
          <div style={{ width: `${presentPct}%`, background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)', transition: 'width var(--transition-normal)' }} title={`Present: ${presentPct}%`} />
          <div style={{ width: `${latePct}%`, background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)', transition: 'width var(--transition-normal)' }} title={`Late: ${latePct}%`} />
          <div style={{ width: `${leavePct}%`, background: 'linear-gradient(90deg, #D4AF37 0%, #FDE047 100%)', transition: 'width var(--transition-normal)' }} title={`On Leave: ${leavePct}%`} />
          <div style={{ width: `${absentPct}%`, background: 'linear-gradient(90deg, #EF4444 0%, #F87171 100%)', transition: 'width var(--transition-normal)' }} title={`Absent: ${absentPct}%`} />
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-success)', boxShadow: '0 0 6px var(--status-success)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Present ({presentPct}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-warning)', boxShadow: '0 0 6px var(--status-warning)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Late ({latePct}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--champagne-gold)', boxShadow: '0 0 6px var(--champagne-gold)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>On Leave ({leavePct}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-danger)', boxShadow: '0 0 6px var(--status-danger)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Absent ({absentPct}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
