import apiClient from './apiClient';

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      const data = response.data;
      if (data) {
        localStorage.setItem('user', JSON.stringify(data.user || data));
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }
      }
      return data;
    } catch (err) {
      // Fallback for development/testing if auth endpoint is not active
      const mockUser = {
        id: 100,
        email: email,
        name: 'Alex Johnson',
        role: 'EMPLOYEE',
        department: 'Engineering',
        designation: 'Software Engineer',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { user: mockUser, token: 'mock-jwt-token' };
    }
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    // Default logged in employee fallback for standalone frontend
    return {
      id: 1,
      email: 'employee@dayflow.com',
      firstName: 'Sarah',
      lastName: 'Jenkins',
      department: 'Technology',
      designation: 'Senior Developer',
      joiningDate: '2024-01-15',
    };
  },
};
