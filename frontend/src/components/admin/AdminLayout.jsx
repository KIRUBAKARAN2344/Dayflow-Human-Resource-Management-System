import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import Navbar from './AdminNavbar';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobileOpen) {
      setIsMobileOpen(false);
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
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
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
          <Outlet context={{ onNavigate: handleNavigation }} />
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
