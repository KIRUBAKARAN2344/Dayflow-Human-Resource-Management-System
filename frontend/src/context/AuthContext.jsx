import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser,
  isAuthenticated as checkAuth,
} from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore authenticated user on page reload
    const existingUser = getCurrentUser();
    if (existingUser) {
      setUser(existingUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const loggedUser = await apiLogin(credentials);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user && user.token),
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
