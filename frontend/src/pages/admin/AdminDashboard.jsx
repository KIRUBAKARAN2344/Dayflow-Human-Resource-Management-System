import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/admin/dashboard/StatsCard';
import AttendanceOverview from '../../components/admin/dashboard/AttendanceOverview';
import RecentAttendance from '../../components/admin/dashboard/RecentAttendance';
import RecentLeaveRequests from '../../components/admin/dashboard/RecentLeaveRequests';
import QuickActions from '../../components/admin/dashboard/QuickActions';
import {
  EmployeesIcon,
  AttendanceIcon,
  LeaveIcon,
  ShieldIcon,
  ClockIcon
} from '../../components/common/Icons';

const AdminDashboard = ({ onNavigate }) => {
  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="admin-dashboard-container animate-fade-in">
      {/* Page Header */}
      <PageHeader
        title="Executive Command Dashboard"
        description="Real-time workforce intelligence, organizational metrics, and attendance overview."
        breadcrumb="Overview / Nexus Dashboard"
      />

      {/* Welcome Banner / Executive Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--midnight-navy) 0%, var(--navy-card) 50%, #1A223E 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '26px 30px',
          color: '#FFFFFF',
          marginBottom: '28px',
          border: '1px solid var(--border-dark)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient Decorative Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '25%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(91, 95, 239, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(30px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '10px',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(25px)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--champagne-gold)',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '6px',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--champagne-gold)' }} />
            Dayflow Royal Nexus Portal
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Good day, Administrator 👋
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', margin: '6px 0 0 0', maxWidth: '600px' }}>
            Here is your real-time organizational performance and attendance intelligence for <strong style={{ color: '#FFFFFF' }}>{currentDateStr}</strong>.
          </p>
        </div>

        {/* Date & Shift Pill */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(8, 11, 24, 0.7)',
            backdropFilter: 'blur(8px)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-dark)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--champagne-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ClockIcon size={18} />
          </div>
          <div style={{ fontSize: '12.5px' }}>
            <div style={{ fontWeight: '700', color: '#FFFFFF', letterSpacing: '0.01em' }}>Executive Operations</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '11.5px', marginTop: '1px' }}>09:00 AM - 06:00 PM EST · Active</div>
          </div>
        </div>
      </div>

      {/* KPI Statistics 4-Card Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <StatsCard
          title="Total Employees"
          value="248"
          trend="+12"
          subtitle="added this month"
          trendType="positive"
          icon={EmployeesIcon}
          accentColor="var(--royal-indigo)"
          badgeBg="var(--royal-indigo-light)"
        />

        <StatsCard
          title="Present Today"
          value="218"
          trend="87.9%"
          subtitle="attendance rate"
          trendType="positive"
          icon={AttendanceIcon}
          accentColor="var(--status-success)"
          badgeBg="var(--status-success-bg)"
        />

        <StatsCard
          title="Absent Today"
          value="12"
          trend="4.8%"
          subtitle="of workforce"
          trendType="negative"
          icon={ShieldIcon}
          accentColor="var(--status-danger)"
          badgeBg="var(--status-danger-bg)"
        />

        <StatsCard
          title="On Leave"
          value="18"
          trend="7.3%"
          subtitle="on approved leave"
          trendType="neutral"
          icon={LeaveIcon}
          accentColor="var(--champagne-gold)"
          badgeBg="var(--champagne-gold-light)"
        />
      </div>

      {/* Attendance Analytics Overview */}
      <AttendanceOverview />

      {/* Two-Column Grid: Recent Attendance + Recent Leave Requests */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        <RecentAttendance onViewAll={() => handleNavigation('/admin/attendance')} />
        <RecentLeaveRequests onViewAll={() => handleNavigation('/admin/leave-requests')} />
      </div>

      {/* Executive Quick Actions Grid */}
      <QuickActions onNavigate={handleNavigation} />
    </div>
  );
};

export default AdminDashboard;
