import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus, Filter } from 'lucide-react';
import { leaveService } from '../../services/leaveService';
import { authService } from '../../services/authService';
import LeaveStatus from '../../components/employee/LeaveStatus';
import Button from '../../components/common/Button';

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    setLoading(true);
    setError('');
    try {
      const currentUser = authService.getCurrentUser();
      const data = await leaveService.getMyLeaves(currentUser?.id);
      setLeaves(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch leave history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filteredLeaves = leaves.filter((leave) => {
    if (filterStatus === 'ALL') return true;
    return (leave.status || '').toUpperCase() === filterStatus;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Leave History</h1>
          <p className="page-subtitle">Inspect status and history of all submitted leave requests</p>
        </div>
        <Button variant="primary" icon={FilePlus} onClick={() => navigate('/employee/leave/apply')}>
          Apply New Leave
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} color="var(--text-muted)" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Filter Status:</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  backgroundColor: filterStatus === st ? 'var(--primary-600)' : 'var(--bg-surface)',
                  color: filterStatus === st ? '#ffffff' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '36px' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Loading leave requests...</p>
          </div>
        ) : filteredLeaves.length === 0 ? (
          <div className="empty-state">
            <p>No leave requests found matching the current filter.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((item) => (
                  <tr key={item.id || Math.random()}>
                    <td>
                      <span className={`badge badge-${(item.leaveType || 'PAID').toLowerCase()}`}>
                        {item.leaveType}
                      </span>
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.startDate}</td>
                    <td style={{ fontWeight: '600' }}>{item.endDate}</td>
                    <td>{item.reason || 'N/A'}</td>
                    <td>
                      <LeaveStatus status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveHistory;
