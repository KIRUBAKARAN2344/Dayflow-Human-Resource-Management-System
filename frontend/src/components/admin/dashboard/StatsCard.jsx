import React from 'react';
import { TrendingUpIcon } from '../../common/Icons';

const StatsCard = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  accentColor = 'var(--champagne-gold)',
  badgeBg = 'rgba(201, 162, 39, 0.12)'
}) => {
  const getTrendColor = () => {
    if (trendType === 'positive') return 'var(--status-success)';
    if (trendType === 'negative') return 'var(--status-danger)';
    return 'var(--text-secondary)';
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        padding: '22px 24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Top Subtle Status Accent Stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: accentColor,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
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
            {title}
          </div>
          <div
            style={{
              fontSize: '30px',
              fontWeight: '800',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginTop: '4px',
              lineHeight: '1.1',
            }}
          >
            {value}
          </div>
        </div>

        {/* Icon Container */}
        {Icon && (
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: badgeBg,
              border: `1px solid ${accentColor}`,
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 10px ${badgeBg}`,
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      {/* Footer Subtitle / Trend */}
      {(subtitle || trend) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12.5px',
            paddingTop: '10px',
            borderTop: '1px solid #F1F5F9',
          }}
        >
          {trend && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: getTrendColor(),
                fontWeight: '700',
              }}
            >
              <TrendingUpIcon size={14} />
              {trend}
            </span>
          )}
          {subtitle && (
            <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
