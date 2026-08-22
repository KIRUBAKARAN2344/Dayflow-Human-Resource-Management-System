import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  DashboardIcon,
  EmployeesIcon,
  AttendanceIcon,
  LeaveIcon,
  PayrollIcon,
  SettingsIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ShieldIcon,
} from './Icons';

const Sidebar = ({
  currentPath = '/admin/dashboard',
  onNavigate,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {
    // Graceful fallback if rendered outside AuthProvider
  }

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        {
          label: 'Dashboard',
          path: '/admin/dashboard',
          icon: DashboardIcon,
        },
      ],
    },
    {
      title: 'PEOPLE',
      items: [
        {
          label: 'Employees',
          path: '/admin/employees',
          icon: EmployeesIcon,
        },
        {
          label: 'Attendance',
          path: '/admin/attendance',
          icon: AttendanceIcon,
        },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        {
          label: 'Leave Requests',
          path: '/admin/leave-requests',
          icon: LeaveIcon,
        },
        {
          label: 'Payroll',
          path: '/admin/payroll',
          icon: PayrollIcon,
        },
      ],
    },
  ];

  const handleNavClick = (path, e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    if (auth && auth.logout) {
      await auth.logout();
    }
    handleNavClick('/login');
  };

  const isLinkActive = (path) => {
    if (path === '/admin/dashboard' && (currentPath === '/admin' || currentPath === '/admin/dashboard')) {
      return true;
    }
    if (path === '/admin/employees' && currentPath.startsWith('/admin/employees')) {
      return true;
    }
    if (
      path === '/admin/leave-requests' &&
      (currentPath === '/admin/leave' || currentPath === '/admin/leave-requests')
    ) {
      return true;
    }
    return currentPath === path;
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 16, 32, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 90,
          }}
          aria-hidden="true"
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--navy-deep)',
          borderRight: '1px solid var(--border-dark)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          transition: 'width var(--transition-normal), transform var(--transition-normal)',
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(0)',
        }}
        className={`sidebar-container ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            height: 'var(--navbar-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            padding: isCollapsed ? '0 12px' : '0 20px',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          <div
            onClick={(e) => handleNavClick('/admin/dashboard', e)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textDecoration: 'none',
              overflow: 'hidden',
            }}
          >
            {/* Crest Mark */}
            <div
              style={{
                width: '38px',
                height: '38px',
                minWidth: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #171D38 0%, #0B1020 100%)',
                border: '1px solid var(--champagne-gold)',
                boxShadow: '0 0 12px var(--champagne-gold-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--champagne-gold)',
              }}
            >
              <ShieldIcon size={20} />
            </div>

            {!isCollapsed && (
              <div style={{ whiteSpace: 'nowrap' }}>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: '17px',
                    fontWeight: '800',
                    letterSpacing: '0.08em',
                    lineHeight: '1.1',
                  }}
                >
                  DAYFLOW
                </div>
                <div
                  style={{
                    color: 'var(--champagne-gold)',
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Royal HR Executive
                </div>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              title="Collapse Sidebar"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              className="desktop-only-btn"
            >
              <ChevronLeftIcon size={18} />
            </button>
          )}

          {/* Mobile Close Button */}
          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px',
              }}
              className="mobile-close-btn"
            >
              <CloseIcon size={20} />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <div
          className="sidebar-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: isCollapsed ? '16px 8px' : '20px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {navGroups.map((group, idx) => (
            <div key={idx}>
              {!isCollapsed ? (
                <div
                  style={{
                    color: 'var(--champagne-gold)',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.14em',
                    padding: '0 10px 10px 10px',
                    textTransform: 'uppercase',
                    opacity: 0.85,
                  }}
                >
                  {group.title}
                </div>
              ) : (
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'var(--border-dark)',
                    margin: '8px 4px 14px 4px',
                  }}
                />
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isLinkActive(item.path);

                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={(e) => handleNavClick(item.path, e)}
                      title={isCollapsed ? item.label : undefined}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: isCollapsed ? '12px 0' : '11px 14px',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: active ? '#FFFFFF' : 'var(--text-muted)',
                        background: active
                          ? 'linear-gradient(135deg, rgba(91, 95, 239, 0.9) 0%, rgba(124, 92, 252, 0.85) 100%)'
                          : 'transparent',
                        fontWeight: active ? '600' : '500',
                        fontSize: '13.5px',
                        transition: 'all var(--transition-fast)',
                        boxShadow: active ? '0 4px 12px rgba(91, 95, 239, 0.35)' : 'none',
                        border: active ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.color = '#F8FAFC';
                          e.currentTarget.style.transform = 'translateX(3px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--text-muted)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      {/* Active Accent Glow Bar */}
                      {active && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '18%',
                            bottom: '18%',
                            width: '3.5px',
                            backgroundColor: 'var(--champagne-gold)',
                            borderRadius: '0 4px 4px 0',
                            boxShadow: '0 0 10px var(--champagne-gold)',
                          }}
                        />
                      )}

                      <Icon
                        size={19}
                        style={{
                          color: active ? '#FFFFFF' : 'inherit',
                          transition: 'color var(--transition-fast)',
                        }}
                      />

                      {!isCollapsed && (
                        <span style={{ whiteSpace: 'nowrap', flex: 1, letterSpacing: '-0.01em' }}>
                          {item.label}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Collapsed Expand Trigger (Bottom) */}
        {isCollapsed && (
          <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={onToggleCollapse}
              title="Expand Sidebar"
              style={{
                background: 'var(--royal-indigo)',
                border: '1px solid var(--border-dark)',
                color: 'var(--champagne-gold)',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>
        )}

        {/* Bottom Section: Logout & User Profile */}
        <div
          style={{
            padding: isCollapsed ? '12px 8px' : '16px 14px',
            borderTop: '1px solid var(--border-dark)',
            backgroundColor: 'var(--navy-surface)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Logout Item */}
          <button
            onClick={handleLogout}
            title={isCollapsed ? 'Logout' : undefined}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: isCollapsed ? '10px 0' : '10px 12px',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              color: '#F87171',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(201, 76, 76, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <LogoutIcon size={19} />
            {!isCollapsed && <span>Logout</span>}
          </button>

          {/* Admin Profile Footer */}
          {!isCollapsed && (
            <div
              style={{
                marginTop: '6px',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(23, 29, 56, 0.5)',
                border: '1px solid var(--border-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--royal-indigo)',
                  border: '1px solid var(--champagne-gold)',
                  color: 'var(--champagne-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                A
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {auth?.user?.name || 'Administrator'}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--status-success)',
                      boxShadow: '0 0 6px var(--status-success)',
                    }}
                  />
                  Online · Admin
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Embedded Responsive CSS Rules for Sidebar */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-only-btn {
            display: none !important;
          }
          .sidebar-container {
            transform: translateX(-100%) !important;
            width: var(--sidebar-width) !important;
          }
          .sidebar-container.mobile-open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
