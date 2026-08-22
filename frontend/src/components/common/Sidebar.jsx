import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Clock,
  CalendarPlus,
  CalendarCheck,
  Wallet,
  Layers,
} from 'lucide-react';

/**
 * Employee Sidebar — Used inside EmployeeLayout for /employee/* routes.
 * Uses React Router's useNavigate and useLocation for navigation.
 */
const NAV_ITEMS = [
  {
    label: 'Main',
    items: [
      { to: '/employee/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
      { to: '/employee/profile',   icon: User,            text: 'My Profile' },
    ],
  },
  {
    label: 'Attendance',
    items: [
      { to: '/employee/attendance', icon: Clock, text: 'Attendance' },
    ],
  },
  {
    label: 'Leave',
    items: [
      { to: '/employee/leave/apply',   icon: CalendarPlus,  text: 'Apply Leave' },
      { to: '/employee/leave/history', icon: CalendarCheck, text: 'Leave History' },
    ],
  },
  {
    label: 'Payroll',
    items: [
      { to: '/employee/payroll', icon: Wallet, text: 'Payroll' },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Layers size={20} />
        </div>
        <span className="sidebar-logo-text">Dayflow</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((group) => (
          <div key={group.label}>
            <div className="sidebar-label">{group.label}</div>
            {group.items.map(({ to, icon: Icon, text }) => {
              const active = location.pathname === to;
              return (
                <button
                  key={to}
                  className={`sidebar-link ${active ? 'active' : ''}`}
                  onClick={() => navigate(to)}
                >
                  <Icon size={17} />
                  {text}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
