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

    // Save to local cache
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

    // Update local cache
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
