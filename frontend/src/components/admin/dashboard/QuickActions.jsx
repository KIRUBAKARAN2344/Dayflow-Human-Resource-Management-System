import React from 'react';
import {
  EmployeesIcon,
  AttendanceIcon,
  LeaveIcon,
  PayrollIcon,
  ArrowRightIcon
} from '../../common/Icons';

const QuickActions = ({ onNavigate }) => {
  const actions = [
    {
      title: 'Add New Employee',
      description: 'Register a new workforce member, assign role, and set up profile.',
      icon: EmployeesIcon,
      path: '/admin/employees',
      accent: 'var(--royal-indigo)',
      btnText: 'Add Employee',
    },
    {
      title: 'Monitor Attendance',
      description: 'View check-in logs, late reports, and daily attendance summaries.',
      icon: AttendanceIcon,
      path: '/admin/attendance',
      accent: 'var(--status-success)',
      btnText: 'View Records',
    },
    {
      title: 'Review Leave Requests',
      description: 'Process pending medical, casual, and annual leave applications.',
      icon: LeaveIcon,
      path: '/admin/leave-requests',
      accent: 'var(--champagne-gold)',
      btnText: 'Process Requests',
    },
    {
      title: 'Payroll Management',
      description: 'Generate monthly salary reports, deductions, and disbursements.',
      icon: PayrollIcon,
      path: '/admin/payroll',
      accent: '#2563EB',
      btnText: 'Manage Payroll',
    },
  ];

  const handleClick = (path, e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <div
      style={{
        marginTop: '28px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
          Executive Quick Actions
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          Shortcuts for core HR administrative operations
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        {actions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={(e) => handleClick(item.path, e)}
              style={{
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = item.accent;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(23, 29, 56, 0.08)',
                    color: item.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', margin: 0, lineHeight: '1.4' }}>
                    {item.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: item.accent,
                  alignSelf: 'flex-end',
                }}
              >
                <span>{item.btnText}</span>
                <ArrowRightIcon size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
