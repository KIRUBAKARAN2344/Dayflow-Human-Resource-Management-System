import React, { useState, useEffect } from 'react';
import Sidebar from './AdminSidebar';
import Navbar from './AdminNavbar';

const AdminLayout = ({ children, currentPath = '/admin/dashboard', onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sync current path from window.location if not explicitly passed
  const [activePath, setActivePath] = useState(currentPath);

  useEffect(() => {
    setActivePath(currentPath || window.location.pathname);
  }, [currentPath]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActivePath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleNavigation = (path) => {
    setActivePath(path);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div
      className="nexus-ambient-bg"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-main)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Royal Executive Sidebar */}
      <Sidebar
        currentPath={activePath}
        onNavigate={handleNavigation}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Container Area */}
      <div
        className="main-layout-content"
        style={{
          marginLeft: isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: 'margin-left var(--transition-normal)',
        }}
      >
        {/* Navbar Header */}
        <Navbar
          currentPath={activePath}
          onToggleSidebar={handleToggleSidebar}
          onNavigate={handleNavigation}
          isSidebarCollapsed={isCollapsed}
        />

        {/* Content Viewport */}
        <main
          style={{
            flex: 1,
            padding: '32px 32px 48px 32px',
            maxWidth: '1600px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </main>
      </div>

      {/* Embedded CSS for responsive margin adjustment */}
      <style>{`
        @media (max-width: 1024px) {
          .main-layout-content {
            margin-left: 0 !important;
          }
        }
        @media (max-width: 640px) {
          main {
            padding: 20px 16px 36px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
