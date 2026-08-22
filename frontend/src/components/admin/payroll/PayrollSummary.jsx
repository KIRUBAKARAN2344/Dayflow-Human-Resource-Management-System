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
      badgeBg: 'rgba(23, 29, 56, 0.08)',
    },
    {
      title: 'GROSS PAYROLL',
      count: formatCurrency(stats.totalGross),
      subtitle: 'Total earnings before deductions',
      icon: TrendingUpIcon,
      accent: 'var(--status-info)',
      badgeBg: 'rgba(37, 99, 235, 0.1)',
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
      badgeBg: 'rgba(201, 162, 39, 0.12)',
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
          : 'rgba(105, 112, 134, 0.1)',
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
                    fontSize: typeof card.count === 'string' && card.count.length > 8 ? '20px' : '24px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginTop: '2px',
                    lineHeight: '1.2',
                  }}
                >
                  {card.count}
                </div>
                <div
                  style={{
                    fontSize: '11.5px',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
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
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Salary Statistics & Department Breakdown 2-Column Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Salary Benchmarks Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Salary Statistics Benchmarks
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Average Salary
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
                {formatCurrency(stats.avgSalary)}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Highest Salary
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--status-success)', marginTop: '4px' }}>
                {formatCurrency(stats.highestSalary)}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Lowest Salary
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--status-info)', marginTop: '4px' }}>
                {formatCurrency(stats.lowestSalary)}
              </div>
            </div>
          </div>
        </div>

        {/* Department Payroll Breakdown */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>
            Department Net Payroll Breakdown
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.departmentBreakdown &&
              stats.departmentBreakdown.map((dept) => {
                const pct = stats.totalNet > 0 ? ((dept.totalNet / stats.totalNet) * 100).toFixed(1) : 0;
                return (
                  <div key={dept.department}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                        {dept.department} ({dept.employeeCount})
                      </span>
                      <span style={{ fontWeight: '700', color: 'var(--champagne-gold)' }}>
                        {formatCurrency(dept.totalNet)} ({pct}%)
                      </span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          backgroundColor: 'var(--royal-indigo)',
                          borderRadius: '3px',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSummary;
