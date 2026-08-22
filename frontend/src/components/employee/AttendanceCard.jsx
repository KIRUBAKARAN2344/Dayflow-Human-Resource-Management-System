import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, CheckCircle2 } from 'lucide-react';

const AttendanceCard = ({ attendance, onCheckIn, onCheckOut, loading }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isCheckedIn  = !!attendance?.checkIn;
  const isCheckedOut = !!attendance?.checkOut;

  const timeStr = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="glass-card card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Live Clock */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div
            style={{
              fontSize: '44px',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1.1,
            }}
          >
            {timeStr}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
            {dateStr}
          </div>
        </div>

        {/* Status */}
        <div style={{ textAlign: 'right' }}>
          {isCheckedIn && !isCheckedOut ? (
            <span className="badge badge-present" style={{ fontSize: '13px', padding: '6px 14px' }}>
              <CheckCircle2 size={14} /> Present
            </span>
          ) : isCheckedOut ? (
            <span className="badge badge-approved" style={{ fontSize: '13px', padding: '6px 14px' }}>
              <CheckCircle2 size={14} /> Completed
            </span>
          ) : (
            <span className="badge badge-absent" style={{ fontSize: '13px', padding: '6px 14px' }}>
              Not Checked In
            </span>
          )}
        </div>
      </div>

      {/* Time detail row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px',
        }}
      >
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
            Check In
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: attendance?.checkIn ? 'var(--success-text)' : 'var(--text-light)' }}>
            {attendance?.checkIn || '--:--'}
          </div>
        </div>
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
            Check Out
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: attendance?.checkOut ? 'var(--danger-text)' : 'var(--text-light)' }}>
            {attendance?.checkOut || '--:--'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '14px' }}>
        <button
          className="btn btn-primary"
          style={{ flex: 1, padding: '13px', fontSize: '15px' }}
          onClick={onCheckIn}
          disabled={loading || isCheckedIn}
        >
          <LogIn size={18} />
          {isCheckedIn ? 'Checked In ✓' : 'Check In'}
        </button>
        <button
          className="btn btn-secondary"
          style={{ flex: 1, padding: '13px', fontSize: '15px' }}
          onClick={onCheckOut}
          disabled={loading || !isCheckedIn || isCheckedOut}
        >
          <LogOut size={18} />
          {isCheckedOut ? 'Checked Out ✓' : 'Check Out'}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
          <span className="spinner" style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle' }} />
          Processing...
        </div>
      )}
    </div>
  );
};

export default AttendanceCard;
