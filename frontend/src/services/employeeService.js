import apiClient from './apiClient';
import { authService } from './authService';

export const employeeService = {
  async getProfile(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    try {
      const response = await apiClient.get(`/api/employees/${targetId}`);
      return response.data;
    } catch (err) {
      // Return user profile fallback if Member 1 backend is pending
      const user = authService.getCurrentUser();
      return {
        id: targetId,
        firstName: user?.firstName || 'Sarah',
        lastName: user?.lastName || 'Jenkins',
        email: user?.email || 'sarah.jenkins@dayflow.com',
        phone: '+1 (555) 234-5678',
        department: user?.department || 'Software Development',
        designation: user?.designation || 'Senior Software Engineer',
        joiningDate: '2023-03-01',
        role: 'EMPLOYEE',
      };
    }
  },
};
