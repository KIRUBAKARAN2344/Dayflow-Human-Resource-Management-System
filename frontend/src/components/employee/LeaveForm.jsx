import React, { useState } from 'react';
import { Send, Calendar, FileText } from 'lucide-react';
import Button from '../common/Button';

const LeaveForm = ({ onSubmit, loading }) => {
  const [leaveType, setLeaveType] = useState('PAID');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!leaveType) {
      setError('Please select a leave type.');
      return;
    }
    if (!startDate) {
      setError('Start date is required.');
      return;
    }
    if (!endDate) {
      setError('End date is required.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('End date cannot be before start date.');
      return;
    }

    onSubmit(
      { leaveType, startDate, endDate, reason },
      () => {
        // Reset form on success
        setStartDate('');
        setEndDate('');
        setReason('');
        setLeaveType('PAID');
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
        Submit Leave Request
      </h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group">
        <label className="form-label">Leave Type</label>
        <select
          className="form-control"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          required
        >
          <option value="PAID">PAID (Paid Time Off)</option>
          <option value="SICK">SICK (Medical / Sick Leave)</option>
          <option value="UNPAID">UNPAID (Unpaid Leave)</option>
        </select>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Reason / Remarks</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Specify reason for leave request..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
      </div>

      <Button type="submit" variant="primary" icon={Send} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Request'}
      </Button>
    </form>
  );
};

export default LeaveForm;
