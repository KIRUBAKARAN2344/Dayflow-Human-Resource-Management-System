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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--royal-indigo)',
              backgroundColor: 'var(--royal-indigo-light)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              border: '1px solid rgba(91, 95, 239, 0.2)',
            }}
          >
            {breadcrumb}
          </div>
        )}

        {/* Page Title */}
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
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
              maxWidth: '650px',
              lineHeight: '1.5',
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
