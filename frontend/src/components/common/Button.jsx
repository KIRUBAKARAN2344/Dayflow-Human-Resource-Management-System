import React from 'react';

/**
 * Combined Button component — supports both Admin (nexus-btn) and Employee (btn) class systems.
 * Member 3 uses nexus-btn variants; Member 4 uses btn variants.
 * This component maps variant prop to both class systems based on context.
 */
const Button = ({
  children,
  variant = 'primary',    // 'primary' | 'secondary' | 'gold' | 'danger' | 'success'
  size = 'md',            // 'sm' | 'md' | 'lg'
  icon: Icon,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) => {
  const getNexusClass = () => {
    switch (variant) {
      case 'gold':      return 'nexus-btn-gold';
      case 'secondary': return 'nexus-btn-secondary';
      case 'danger':    return 'nexus-btn-danger';
      case 'success':   return 'nexus-btn-success';
      case 'primary':
      default:          return 'nexus-btn-primary';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm': return { padding: '6px 12px', fontSize: '12.5px', borderRadius: 'var(--radius-sm)' };
      case 'lg': return { padding: '12px 24px', fontSize: '15px',   borderRadius: 'var(--radius-lg)' };
      case 'md':
      default:   return { padding: '9px 18px',  fontSize: '13.5px', borderRadius: 'var(--radius-md)' };
    }
  };

  // Use nexus-btn for admin context (nexus CSS), btn for employee context
  // Detect by class presence — if className contains 'btn-' already use simple system
  const useSimple = className.includes('btn-');

  if (useSimple) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`btn btn-${variant} ${className}`}
        style={style}
        {...props}
      >
        {Icon && <Icon size={16} />}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`nexus-btn ${getNexusClass()} ${className}`}
      style={{
        ...getSizeStyle(),
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      {children}
    </button>
  );
};

export default Button;
