// =============================================================================
// AUTH SERVICE — Combined Admin (mock) + Employee (API with fallback)
// =============================================================================

const AUTH_STORAGE_KEY = 'dayflow_admin_auth';

// ── Admin Mock Auth (Member 3) ────────────────────────────────────────────────
export const login = async ({ email, password, role = 'Admin' }) => {
  await new Promise((res) => setTimeout(res, 250));
  const trimmedEmail = email?.trim().toLowerCase();

  if (
    (trimmedEmail === 'admin@dayflow.com' && password === 'admin123') ||
    (trimmedEmail && password && trimmedEmail.includes('admin'))
  ) {
    const user = {
      id: 'ADM-001',
      name: 'Administrator',
      email: trimmedEmail || 'admin@dayflow.com',
      role: 'Admin',
      department: 'Executive HR',
      token: 'jwt-mock-admin-token-' + Date.now(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  if (
    (trimmedEmail === 'employee@dayflow.com' && password === 'emp123') ||
    (trimmedEmail && password && (trimmedEmail.includes('emp') || role === 'Employee'))
  ) {
    const user = {
      id: 'EMP-001',
      name: 'Sarah Jenkins',
      email: trimmedEmail || 'employee@dayflow.com',
      role: 'Employee',
      department: 'Engineering',
      token: 'jwt-mock-emp-token-' + Date.now(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  if (trimmedEmail && password && password.length >= 3) {
    const isEmp = role === 'Employee' || trimmedEmail.includes('emp');
    const user = {
      id: isEmp ? 'EMP-002' : 'ADM-001',
      name: trimmedEmail.split('@')[0].toUpperCase(),
      email: trimmedEmail,
      role: isEmp ? 'Employee' : 'Admin',
      department: isEmp ? 'Engineering' : 'Human Resources',
      token: 'jwt-mock-token-' + Date.now(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  throw new Error('Invalid email or password. Use demo credentials to sign in.');
};

export const logout = async () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem('user');
  localStorage.removeItem('auth_token');
  return true;
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return Boolean(user && user.token);
};

// ── Employee API Auth Service (Member 4) ──────────────────────────────────────
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
      // Fallback for development/testing
      const mockUser = {
        id: 100,
        email: email,
        name: 'Alex Johnson',
        firstName: 'Alex',
        lastName: 'Johnson',
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
    localStorage.removeItem(AUTH_STORAGE_KEY);
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
    // Default logged-in employee fallback for standalone frontend
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
