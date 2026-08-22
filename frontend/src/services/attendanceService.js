import apiClient from './apiClient';
import { authService } from './authService';

export const attendanceService = {
  async checkIn(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const response = await apiClient.post('/api/attendance/check-in', { employeeId: targetId });
    return response.data;
  },

  async checkOut(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const response = await apiClient.post('/api/attendance/check-out', { employeeId: targetId });
    return response.data;
  },

  async getMyAttendance(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const response = await apiClient.get(`/api/attendance/me?employeeId=${targetId}`);
    return response.data;
  },
};
