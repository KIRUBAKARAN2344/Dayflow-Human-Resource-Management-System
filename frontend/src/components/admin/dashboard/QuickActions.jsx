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
      accent: 'var(--electric-blue)',
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
      className="nexus-card"
      style={{
        marginTop: '28px',
        padding: '24px 26px',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
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
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.title}
              onClick={(e) => handleClick(act.path, e)}
              className="nexus-card-interactive"
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-main)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = act.accent;
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                    border: `1.5px solid ${act.accent}`,
                    color: act.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  {act.title}
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  {act.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  color: act.accent,
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                <span>{act.btnText}</span>
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
