import React from 'react';

const Badge = ({
  children,
  variant = 'neutral', // 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'neutral'
  hasDot = true,
  className = '',
  style = {},
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success': return 'nexus-pill-success';
      case 'warning': return 'nexus-pill-warning';
      case 'danger': return 'nexus-pill-danger';
      case 'info': return 'nexus-pill-info';
      case 'gold': return 'nexus-pill-gold';
      case 'neutral':
      default: return 'nexus-pill-neutral';
    }
  };

  return (
    <span className={`nexus-pill ${getVariantClass()} ${className}`} style={style}>
      {hasDot && <span className="nexus-dot" />}
      {children}
    </span>
  );
};

export default Badge;
