// =============================================================================
// ATTENDANCE SERVICE — Combined Admin (mock) + Employee (API with local cache)
// =============================================================================

// ── Admin Mock Attendance Records (Member 3) ──────────────────────────────────
let mockAttendanceRecords = [
  {
    id: 'ATT-1001', employeeId: 'EMP-001', employeeName: 'Alexander Wright',
    department: 'Engineering', date: new Date().toISOString().split('T')[0],
    checkIn: '08:45 AM', checkOut: '05:30 PM', breakDuration: '01:00',
    workingHours: '07:45', status: 'Present', remarks: 'On-time check-in. Standard shift completed.', avatarColor: '#1D4ED8',
  },
  {
    id: 'ATT-1002', employeeId: 'EMP-002', employeeName: 'Sophia Martinez',
    department: 'Human Resources', date: new Date().toISOString().split('T')[0],
    checkIn: '09:02 AM', checkOut: '06:05 PM', breakDuration: '01:00',
    workingHours: '08:03', status: 'Present', remarks: 'Checked in on time. HR shift completed.', avatarColor: '#059669',
  },
  {
    id: 'ATT-1003', employeeId: 'EMP-003', employeeName: 'Marcus Chen',
    department: 'Product Design', date: new Date().toISOString().split('T')[0],
    checkIn: '09:28 AM', checkOut: '06:30 PM', breakDuration: '01:00',
    workingHours: '08:02', status: 'Late', remarks: 'Arrived 28 minutes late due to transit delay.', avatarColor: '#D97706',
  },
  {
    id: 'ATT-1004', employeeId: 'EMP-004', employeeName: 'Emily Davis',
    department: 'Marketing', date: new Date().toISOString().split('T')[0],
    checkIn: '08:50 AM', checkOut: '05:45 PM', breakDuration: '01:00',
    workingHours: '07:55', status: 'Present', remarks: 'Standard check-in completed.', avatarColor: '#7C3AED',
  },
  {
    id: 'ATT-1005', employeeId: 'EMP-005', employeeName: 'David Kim',
    department: 'Finance', date: new Date().toISOString().split('T')[0],
    checkIn: '-', checkOut: '-', breakDuration: '-',
    workingHours: '00:00', status: 'Leave', remarks: 'Approved Annual Leave.', avatarColor: '#DC2626',
  },
  {
    id: 'ATT-1006', employeeId: 'EMP-006', employeeName: 'Sarah Jenkins',
    department: 'Engineering', date: new Date().toISOString().split('T')[0],
    checkIn: '01:00 PM', checkOut: '06:00 PM', breakDuration: '00:30',
    workingHours: '04:30', status: 'Half Day', remarks: 'Half day approved for personal appointment.', avatarColor: '#2563EB',
  },
  {
    id: 'ATT-1007', employeeId: 'EMP-007', employeeName: 'Michael Chang',
    department: 'Operations', date: new Date().toISOString().split('T')[0],
    checkIn: '-', checkOut: '-', breakDuration: '-',
    workingHours: '00:00', status: 'Absent', remarks: 'Unexcused absence. HR follow-up required.', avatarColor: '#0891B2',
  },
  {
    id: 'ATT-1008', employeeId: 'EMP-008', employeeName: 'Elena Rostova',
    department: 'Product Design', date: new Date().toISOString().split('T')[0],
    checkIn: '08:55 AM', checkOut: '05:30 PM', breakDuration: '01:00',
    workingHours: '07:35', status: 'Present', remarks: 'Standard shift completed.', avatarColor: '#4F46E5',
  },
];

export const getAttendanceRecords = async () => {
  await new Promise((res) => setTimeout(res, 200));
  return [...mockAttendanceRecords];
};

export const getEmployeeAttendance = async (employeeId) => {
  await new Promise((res) => setTimeout(res, 150));
  return mockAttendanceRecords.filter((rec) => rec.employeeId === employeeId);
};

export const updateAttendance = async (id, data) => {
  await new Promise((res) => setTimeout(res, 250));
  mockAttendanceRecords = mockAttendanceRecords.map((rec) =>
    rec.id === id ? { ...rec, ...data } : rec
  );
  return mockAttendanceRecords.find((rec) => rec.id === id);
};

export const getAttendanceStats = async () => {
  await new Promise((res) => setTimeout(res, 100));
  const total = mockAttendanceRecords.length;
  const present = mockAttendanceRecords.filter((r) => r.status === 'Present').length;
  const absent = mockAttendanceRecords.filter((r) => r.status === 'Absent').length;
  const late = mockAttendanceRecords.filter((r) => r.status === 'Late').length;
  const leave = mockAttendanceRecords.filter((r) => r.status === 'Leave').length;
  const halfDay = mockAttendanceRecords.filter((r) => r.status === 'Half Day').length;
  return {
    total: 248,
    presentToday: present * 27 + 2,
    absentToday: absent * 2,
    lateToday: late * 2,
    onLeave: leave * 3,
    halfDayToday: halfDay,
    attendanceRate: 87.9,
  };
};

// ── Employee API Attendance Service (Member 4) ────────────────────────────────
import apiClient from './apiClient';
import { authService } from './authService';

const getCacheKey = (empId) => `dayflow_attendance_${empId}`;

const getLocalAttendance = (empId) => {
  try {
    const data = localStorage.getItem(getCacheKey(empId));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalAttendance = (empId, list) => {
  try {
    localStorage.setItem(getCacheKey(empId), JSON.stringify(list));
  } catch {
    // ignore
  }
};

export const attendanceService = {
  async checkIn(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const dateStr = now.toISOString().split('T')[0];

    let resultRecord = null;
    try {
      const response = await apiClient.post('/api/attendance/check-in', { employeeId: targetId });
      resultRecord = response.data;
    } catch {
      resultRecord = {
        id: Date.now(),
        employeeId: targetId,
        date: dateStr,
        checkIn: timeStr,
        checkOut: null,
        status: 'PRESENT',
      };
    }

    const existing = getLocalAttendance(targetId);
    const filtered = existing.filter((item) => item.date !== dateStr);
    const updated = [resultRecord, ...filtered];
    saveLocalAttendance(targetId, updated);

    return resultRecord;
  },

  async checkOut(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const dateStr = now.toISOString().split('T')[0];

    let resultRecord = null;
    try {
      const response = await apiClient.post('/api/attendance/check-out', { employeeId: targetId });
      resultRecord = response.data;
    } catch {
      const existing = getLocalAttendance(targetId);
      const today = existing.find((item) => item.date === dateStr);
      resultRecord = {
        id: today?.id || Date.now(),
        employeeId: targetId,
        date: dateStr,
        checkIn: today?.checkIn || '09:00:00 AM',
        checkOut: timeStr,
        status: 'PRESENT',
      };
    }

    const existing = getLocalAttendance(targetId);
    const filtered = existing.filter((item) => item.date !== dateStr);
    const updated = [resultRecord, ...filtered];
    saveLocalAttendance(targetId, updated);

    return resultRecord;
  },

  async getMyAttendance(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const local = getLocalAttendance(targetId);

    try {
      const response = await apiClient.get(`/api/attendance/me?employeeId=${targetId}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        saveLocalAttendance(targetId, response.data);
        return response.data;
      }
    } catch {
      // fallback to cache
    }

    return local;
  },
};
