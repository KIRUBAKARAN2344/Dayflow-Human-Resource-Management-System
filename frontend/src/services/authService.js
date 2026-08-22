// Dayflow Authentication Service (Admin & Employee)

const AUTH_STORAGE_KEY = 'dayflow_admin_auth';

export const login = async ({ email, password, role = 'Admin' }) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 250));

  const trimmedEmail = email?.trim().toLowerCase();
  
  // 1. Admin login credentials
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

  // 2. Employee login credentials
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

  // 3. Fallback for custom user/demo credentials
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
