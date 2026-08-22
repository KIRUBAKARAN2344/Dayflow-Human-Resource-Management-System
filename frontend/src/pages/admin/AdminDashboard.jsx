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
    <div className="admin-dashboard-container">
      {/* Page Header */}
      <PageHeader
        title="Executive Dashboard"
        description="Organization overview and real-time workforce intelligence"
        breadcrumb="Overview / Dashboard"
      />

      {/* Welcome Banner / Executive Greeting */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--navy-deep) 0%, var(--royal-indigo) 100%)',
          borderRadius: '14px',
          padding: '24px 28px',
          color: '#FFFFFF',
          marginBottom: '28px',
          border: '1px solid var(--champagne-gold)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              color: 'var(--champagne-gold)',
              fontSize: '11.5px',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            Royal HR Executive Portal
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>
            Good day, Administrator 👋
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', margin: '4px 0 0 0' }}>
            Here is your daily organization summary and attendance overview for <strong style={{ color: '#FFFFFF' }}>{currentDateStr}</strong>.
          </p>
        </div>

        {/* Date & Shift Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(11, 16, 32, 0.6)',
            padding: '10px 16px',
            borderRadius: '10px',
            border: '1px solid var(--border-dark)',
          }}
        >
          <ClockIcon size={18} style={{ color: 'var(--champagne-gold)' }} />
          <div style={{ fontSize: '12.5px' }}>
            <div style={{ fontWeight: '700', color: '#FFFFFF' }}>General HR Shift</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>09:00 AM - 06:00 PM EST</div>
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
          badgeBg="rgba(23, 29, 56, 0.08)"
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
          badgeBg="rgba(201, 162, 39, 0.12)"
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
