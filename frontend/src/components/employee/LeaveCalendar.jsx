import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Returns days in a month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
// Returns day-of-week of 1st
const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const SingleMonth = ({ year, month, leaveDates = [] }) => {
  const days  = getDaysInMonth(year, month);
  const first = getFirstDay(year, month);
  const cells = [];

  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const leaveSet = new Set(leaveDates.map((ld) => `${ld}`));

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '12px',
        minWidth: '180px',
      }}
    >
      <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
        {MONTH_NAMES[month]} {year}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
        {DAY_NAMES.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: '10px', fontWeight: '700', color: 'var(--text-light)', paddingBottom: '4px' }}>
            {d}
          </div>
        ))}
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;
          const isLeave = leaveSet.has(`${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`);
          const isToday =
            new Date().getFullYear() === year &&
            new Date().getMonth() === month &&
            new Date().getDate() === day;
          return (
            <div
              key={day}
              style={{
                textAlign: 'center',
                fontSize: '11px',
                padding: '3px 1px',
                borderRadius: '4px',
                fontWeight: isToday ? '800' : '400',
                background: isLeave
                  ? 'rgba(139,92,246,0.35)'
                  : isToday
                  ? 'var(--primary-600)'
                  : 'transparent',
                color: isLeave || isToday ? '#fff' : 'var(--text-main)',
                cursor: 'default',
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LeaveCalendar = ({ leaveDates = [] }) => {
  const today = new Date();
  const [startMonth, setStartMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const months = [];
  for (let i = 0; i < 6; i++) {
    let m = startMonth.month + i;
    let y = startMonth.year;
    if (m >= 12) { m -= 12; y += 1; }
    months.push({ year: y, month: m });
  }

  const prev = () => {
    setStartMonth(({ year, month }) => {
      if (month === 0) return { year: year - 1, month: 11 };
      return { year, month: month - 1 };
    });
  };

  const next = () => {
    setStartMonth(({ year, month }) => {
      if (month === 11) return { year: year + 1, month: 0 };
      return { year, month: month + 1 };
    });
  };

  return (
    <div>
      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <button
          onClick={prev}
          style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
          {MONTH_NAMES[startMonth.month]} {startMonth.year} – {MONTH_NAMES[months[5].month]} {months[5].year}
        </span>
        <button
          onClick={next}
          style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      {/* Grid of 6 months (2 rows × 3 cols) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
      >
        {months.map(({ year, month }) => (
          <SingleMonth
            key={`${year}-${month}`}
            year={year}
            month={month}
            leaveDates={leaveDates}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaveCalendar;
