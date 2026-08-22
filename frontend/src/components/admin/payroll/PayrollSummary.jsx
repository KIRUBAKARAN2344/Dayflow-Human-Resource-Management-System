import React from 'react';
import { formatCurrency } from '../../../utils/formatCurrency';
import {
  PayrollIcon,
  EmployeesIcon,
  TrendingUpIcon,
  ShieldIcon,
  ClockIcon,
} from '../../common/Icons';

const PayrollSummary = ({ stats }) => {
  if (!stats) return null;

  const cards = [
    {
      title: 'TOTAL EMPLOYEES',
      count: stats.totalEmployees,
      subtitle: `${stats.processedCount} processed, ${stats.pendingCount} pending`,
      icon: EmployeesIcon,
      accent: 'var(--royal-indigo)',
      badgeBg: 'var(--royal-indigo-light)',
    },
    {
      title: 'GROSS PAYROLL',
      count: formatCurrency(stats.totalGross),
      subtitle: 'Total earnings before deductions',
      icon: TrendingUpIcon,
      accent: 'var(--status-info)',
      badgeBg: 'var(--status-info-bg)',
    },
    {
      title: 'TOTAL DEDUCTIONS',
      count: formatCurrency(stats.totalDeductions),
      subtitle: 'PF, Tax, and other deductions',
      icon: ShieldIcon,
      accent: 'var(--status-danger)',
      badgeBg: 'var(--status-danger-bg)',
    },
    {
      title: 'NET PAYROLL',
      count: formatCurrency(stats.totalNet),
      subtitle: 'Total net payable amount',
      icon: PayrollIcon,
      accent: 'var(--champagne-gold)',
      badgeBg: 'var(--champagne-gold-light)',
    },
    {
      title: 'PAYROLL STATUS',
      count: stats.overallStatus,
      subtitle: `${stats.month} cycle`,
      icon: ClockIcon,
      accent:
        stats.overallStatus === 'Processed'
          ? 'var(--status-success)'
          : stats.overallStatus === 'Processing'
          ? 'var(--status-warning)'
          : 'var(--text-secondary)',
      badgeBg:
        stats.overallStatus === 'Processed'
          ? 'var(--status-success-bg)'
          : stats.overallStatus === 'Processing'
          ? 'var(--status-warning-bg)'
          : 'rgba(148, 163, 184, 0.1)',
    },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* 5 Summary KPI Cards */}
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
                    fontSize: '22px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginTop: '2px',
                    lineHeight: '1.15',
                  }}
                >
                  {card.count}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '500' }}>
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
    </div>
  );
};

export default PayrollSummary;
