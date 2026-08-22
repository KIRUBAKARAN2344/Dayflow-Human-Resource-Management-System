import React, { useState } from 'react';
import { ArrowRightIcon, LeaveIcon, CheckIcon, CloseIcon } from '../../common/Icons';

const RecentLeaveRequests = ({ requests, onViewAll }) => {
  // Demo mock data
  const defaultRequests = [
    {
      id: 101,
      name: 'Sarah Jenkins',
      role: 'Senior Software Engineer',
      type: 'Medical Leave',
      duration: 'Aug 24 - Aug 26 (3 Days)',
      status: 'Pending',
      submittedAt: '2h ago',
    },
    {
      id: 102,
      name: 'Michael Chang',
      role: 'Product Manager',
      type: 'Annual Leave',
      duration: 'Sep 01 - Sep 05 (5 Days)',
      status: 'Pending',
      submittedAt: '4h ago',
    },
    {
      id: 103,
      name: 'Elena Rostova',
      role: 'UX Researcher',
      type: 'Casual Leave',
      duration: 'Aug 28 (1 Day)',
      status: 'Approved',
      submittedAt: '1d ago',
    },
    {
      id: 104,
      name: 'Robert Vance',
      role: 'QA Specialist',
      type: 'Unpaid Leave',
      duration: 'Sep 10 - Sep 12 (3 Days)',
      status: 'Rejected',
      submittedAt: '2d ago',
    },
  ];

  const [leaveList, setLeaveList] = useState(requests || defaultRequests);

  const handleAction = (id, newStatus) => {
    setLeaveList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return {
          bg: 'var(--status-success-bg)',
          color: 'var(--status-success)',
          border: 'rgba(22, 134, 106, 0.2)',
        };
      case 'Rejected':
        return {
          bg: 'var(--status-danger-bg)',
          color: 'var(--status-danger)',
          border: 'rgba(201, 76, 76, 0.2)',
        };
      case 'Pending':
      default:
        return {
          bg: 'var(--status-warning-bg)',
          color: 'var(--status-warning)',
          border: 'rgba(200, 138, 26, 0.2)',
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        padding: '22px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: 'rgba(201, 162, 39, 0.1)',
              color: 'var(--champagne-gold)',
            }}
          >
            <LeaveIcon size={18} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Pending Leave Approvals
          </h3>
        </div>

        <button
          onClick={onViewAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: 'none',
            color: 'var(--champagne-gold)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span>View All</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>

      {/* Leave Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {leaveList.map((item) => {
          const badge = getStatusBadge(item.status);

          return (
            <div
              key={item.id}
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #F1F5F9',
                backgroundColor: 'var(--bg-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: '700',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      backgroundColor: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  <strong style={{ color: 'var(--navy-deep)' }}>{item.type}</strong> • {item.duration}
                </div>
              </div>

              {/* Action Buttons for Pending Items */}
              {item.status === 'Pending' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => handleAction(item.id, 'Approved')}
                    title="Approve Leave"
                    style={{
                      backgroundColor: 'var(--status-success)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'opacity var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <CheckIcon size={14} />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleAction(item.id, 'Rejected')}
                    title="Reject Leave"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--status-danger)',
                      border: '1px solid var(--status-danger)',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'background-color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--status-danger-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <CloseIcon size={14} />
                    <span>Reject</span>
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {item.submittedAt}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentLeaveRequests;
