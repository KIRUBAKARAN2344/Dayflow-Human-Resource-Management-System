// Admin Authentication Service

const AUTH_STORAGE_KEY = 'dayflow_admin_auth';

export const login = async ({ email, password }) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 250));

  const trimmedEmail = email?.trim().toLowerCase();
  
  // Accept standard demo admin credentials or any valid admin user
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

  // If email format is valid, allow login for development/demo ease
  if (trimmedEmail && password && password.length >= 4) {
    const user = {
      id: 'ADM-001',
      name: trimmedEmail.split('@')[0].toUpperCase(),
      email: trimmedEmail,
      role: 'Admin',
      department: 'Human Resources',
      token: 'jwt-mock-admin-token-' + Date.now(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  throw new Error('Invalid email or password. Use admin@dayflow.com / admin123');
};

export const logout = async () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
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
