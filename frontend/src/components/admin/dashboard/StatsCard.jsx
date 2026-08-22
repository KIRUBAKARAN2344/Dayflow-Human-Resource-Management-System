import React from 'react';
import { TrendingUpIcon } from '../../common/Icons';

const StatsCard = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  accentColor = 'var(--royal-indigo)',
  badgeBg = 'var(--royal-indigo-light)'
}) => {
  const getTrendStyle = () => {
    if (trendType === 'positive') {
      return {
        color: 'var(--status-success)',
        bg: 'var(--status-success-bg)',
        border: 'var(--status-success-border)',
      };
    }
    if (trendType === 'negative') {
      return {
        color: 'var(--status-danger)',
        bg: 'var(--status-danger-bg)',
        border: 'var(--status-danger-border)',
      };
    }
    return {
      color: 'var(--text-secondary)',
      bg: 'rgba(148, 163, 184, 0.1)',
      border: 'var(--border-light)',
    };
  };

  const trendStyle = getTrendStyle();

  return (
    <div
      className="nexus-card nexus-card-interactive"
      style={{
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top Subtle Gradient Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)`,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div
            style={{
              fontSize: '11.5px',
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
              fontSize: '32px',
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
              boxShadow: `0 4px 12px ${badgeBg}`,
              transition: 'transform var(--transition-fast)',
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
            gap: '8px',
            fontSize: '12.5px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {trend && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: trendStyle.color,
                backgroundColor: trendStyle.bg,
                border: `1px solid ${trendStyle.border}`,
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
                fontWeight: '700',
                fontSize: '11.5px',
              }}
            >
              <TrendingUpIcon size={12} />
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
