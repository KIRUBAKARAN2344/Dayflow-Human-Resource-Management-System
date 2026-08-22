import React from 'react';

const PageHeader = ({
  title,
  description,
  breadcrumb,
  actionButton,
  actions
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div>
        {/* Optional Breadcrumb */}
        {breadcrumb && (
          <div
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--champagne-gold)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            {breadcrumb}
          </div>
        )}

        {/* Page Title */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: '800',
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: '1.2',
            margin: 0,
          }}
        >
          {title}
        </h1>

        {/* Page Description */}
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              marginTop: '6px',
              marginBottom: 0,
              maxWidth: '600px',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {(actionButton || actions) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {actionButton}
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
