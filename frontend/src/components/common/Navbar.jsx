import React, { useState, useRef, useEffect } from 'react';
import {
  MenuToggleIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  SettingsIcon,
  LogoutIcon,
  ShieldIcon,
  CheckIcon
} from './Icons';

const Navbar = ({
  currentPath = '/admin/dashboard',
  onToggleSidebar,
  onNavigate,
  isSidebarCollapsed = false
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute breadcrumb title from path
  const getBreadcrumbTitle = (path) => {
    switch (path) {
      case '/admin/dashboard':
      case '/admin':
        return { section: 'Admin', page: 'Dashboard' };
      case '/admin/employees':
        return { section: 'Admin', page: 'Employees' };
      case '/admin/attendance':
        return { section: 'Admin', page: 'Attendance' };
      case '/admin/leave-requests':
      case '/admin/leave':
        return { section: 'Admin', page: 'Leave Requests' };
      case '/admin/payroll':
        return { section: 'Admin', page: 'Payroll' };
      case '/admin/settings':
        return { section: 'Admin', page: 'Settings' };
      default:
        return { section: 'Admin', page: 'Overview' };
    }
  };

  const breadcrumb = getBreadcrumbTitle(currentPath);

  const sampleNotifications = [
    {
      id: 1,
      title: 'New Leave Request',
      description: 'Sarah Jenkins submitted a medical leave request.',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Attendance Alert',
      description: '5 employees marked late for today\'s shift.',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      title: 'Payroll Generated',
      description: 'August monthly payroll draft is ready for review.',
      time: '3h ago',
      unread: false
    }
  ];

  const handleNav = (path, e) => {
    if (e) e.preventDefault();
    setShowProfileMenu(false);
    setShowNotifications(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <header
      className="nexus-card-glass"
      style={{
        height: 'var(--navbar-height)',
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 80,
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Left: Sidebar Toggle & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          style={{
            background: 'rgba(241, 245, 249, 0.8)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-primary)',
            padding: '8px 10px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = 'rgba(91, 95, 239, 0.3)';
            e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.8)';
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <MenuToggleIcon size={19} />
        </button>

        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
            {breadcrumb.section}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span
            style={{
              color: 'var(--text-primary)',
              fontWeight: '700',
              padding: '2px 8px',
              backgroundColor: 'rgba(91, 95, 239, 0.06)',
              borderRadius: '6px',
              border: '1px solid rgba(91, 95, 239, 0.12)',
            }}
          >
            {breadcrumb.page}
          </span>
        </div>
      </div>

      {/* Right Controls: Search, Notifications, Admin Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Quick Search */}
        <div
          className="search-container"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchIcon
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search employees, records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '8px 36px 8px 36px',
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              backgroundColor: '#FFFFFF',
              fontSize: '13px',
              color: 'var(--text-primary)',
              width: '240px',
              outline: 'none',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-xs)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--royal-indigo)';
              e.target.style.boxShadow = '0 0 0 3px var(--royal-indigo-light)';
              e.target.style.width = '270px';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-light)';
              e.target.style.boxShadow = 'var(--shadow-xs)';
              e.target.style.width = '240px';
            }}
          />
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }} ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
            style={{
              position: 'relative',
              background: showNotifications ? 'var(--bg-main)' : 'transparent',
              border: '1px solid',
              borderColor: showNotifications ? 'var(--border-light)' : 'transparent',
              color: 'var(--text-primary)',
              padding: '9px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
            onMouseLeave={(e) => {
              if (!showNotifications) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <BellIcon size={20} />
            {/* Unread Indicator Badge */}
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--champagne-gold)',
                border: '2px solid #FFFFFF',
              }}
            />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-dropdown)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                zIndex: 110,
              }}
            >
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--navy-deep)',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BellIcon size={16} style={{ color: 'var(--champagne-gold)' }} />
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>Notifications</span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    backgroundColor: 'var(--champagne-gold)',
                    color: 'var(--navy-deep)',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '10px',
                  }}
                >
                  2 NEW
                </span>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-light)',
                      backgroundColor: notif.unread ? 'rgba(201, 162, 39, 0.05)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'background-color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = notif.unread
                        ? 'rgba(201, 162, 39, 0.05)'
                        : '#FFFFFF';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {notif.title}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{notif.time}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                      {notif.description}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  borderTop: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-main)',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--royal-indigo)',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Mark all as read
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-light)' }} />

        {/* Admin Profile Menu Pill */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: showProfileMenu ? 'var(--bg-main)' : 'transparent',
              border: '1px solid',
              borderColor: showProfileMenu ? 'var(--border-light)' : 'transparent',
              padding: '5px 10px 5px 6px',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
            onMouseLeave={(e) => {
              if (!showProfileMenu) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Avatar Pill */}
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--navy-deep) 0%, var(--royal-indigo) 100%)',
                border: '1.5px solid var(--champagne-gold)',
                color: 'var(--champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
              }}
            >
              A
            </div>

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }} className="profile-text">
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                Administrator
              </span>
              <span style={{ fontSize: '11px', color: 'var(--champagne-gold)', fontWeight: '600', textTransform: 'uppercase' }}>
                Admin
              </span>
            </div>

            <ChevronDownIcon size={14} style={{ color: 'var(--text-secondary)' }} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '200px',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-dropdown)',
                border: '1px solid var(--border-light)',
                padding: '6px 0',
                zIndex: 110,
              }}
            >
              <div
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '4px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  System Administrator
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>admin@dayflow.com</div>
              </div>

              <a
                href="/admin/profile"
                onClick={(e) => handleNav('/admin/profile', e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'background-color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <UserIcon size={16} style={{ color: 'var(--text-secondary)' }} />
                <span>Profile</span>
              </a>

              <a
                href="/admin/settings"
                onClick={(e) => handleNav('/admin/settings', e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'background-color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <SettingsIcon size={16} style={{ color: 'var(--text-secondary)' }} />
                <span>Settings</span>
              </a>

              <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '4px 0' }} />

              <button
                onClick={(e) => handleNav('/login', e)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  color: 'var(--status-danger)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--status-danger-bg)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <LogoutIcon size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Embedded CSS for responsive search & profile text hiding */}
      <style>{`
        @media (max-width: 768px) {
          .search-container {
            display: none !important;
          }
          .profile-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
