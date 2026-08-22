import React from 'react';
import { Mail, Phone, Plane, Building2, User } from 'lucide-react';

const EmployeeCard = ({ employee, onClick }) => {
  const {
    firstName = 'Employee',
    lastName = '',
    designation = 'Staff Member',
    department = 'General',
    email = 'employee@dayflow.com',
    phone = '+1 (555) 000-0000',
    status = 'PRESENT', // PRESENT, ON_LEAVE, ABSENT
  } = employee;

  const fullName = `${firstName} ${lastName}`.trim();
  const initial = firstName.charAt(0).toUpperCase();

  // Status indicator styling
  const renderStatusIndicator = () => {
    switch (status) {
      case 'PRESENT':
        return (
          <div
            title="Present in Office"
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
              border: '2px solid var(--bg-card)',
            }}
          />
        );
      case 'ON_LEAVE':
        return (
          <div
            title="On Leave"
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: 'rgba(99, 102, 241, 0.25)',
              border: '1px solid #818cf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
            }}
          >
            <Plane size={12} />
          </div>
        );
      case 'ABSENT':
      default:
        return (
          <div
            title="Absent"
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#f59e0b',
              boxShadow: '0 0 8px #f59e0b',
              border: '2px solid var(--bg-card)',
            }}
          />
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className="card"
      style={{
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      {/* Top right status indicator */}
      <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
        {renderStatusIndicator()}
      </div>

      {/* Profile Avatar & Name Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: '800',
            color: '#fff',
            boxShadow: '0 0 16px rgba(139, 92, 246, 0.3)',
            flexShrink: 0,
          }}
        >
          {initial}
        </div>
        <div style={{ overflow: 'hidden', paddingRight: '20px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--text-main)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '2px',
            }}
          >
            {fullName}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--primary-400)', fontWeight: '600' }}>
            {designation}
          </span>
        </div>
      </div>

      {/* Info Details */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={14} color="var(--text-light)" />
          <span>{department}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={14} color="var(--text-light)" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={14} color="var(--text-light)" />
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
