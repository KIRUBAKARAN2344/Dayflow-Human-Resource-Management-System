import apiClient from './apiClient';
import { authService } from './authService';

export const leaveService = {
  async applyLeave(leaveData) {
    const user = authService.getCurrentUser();
    const payload = {
      employeeId: leaveData.employeeId || user?.id || 1,
      leaveType: leaveData.leaveType,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      reason: leaveData.reason || '',
    };
    const response = await apiClient.post('/api/leaves', payload);
    return response.data;
  },

  async getMyLeaves(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const response = await apiClient.get(`/api/leaves/me?employeeId=${targetId}`);
    return response.data;
  },

  async getLeaveById(id) {
    const response = await apiClient.get(`/api/leaves/${id}`);
    return response.data;
  },
};
