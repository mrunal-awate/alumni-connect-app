// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { saveToken, getToken, deleteToken } from '../utils/secureStore';
import api from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token and user profile when app starts
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await getToken('userToken');
        if (storedToken) {
          setToken(storedToken);

          // Fetch user profile
          const res = await api.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          if (res.data?.user) setUser(res.data.user);
        }
      } catch (err) {
        console.log('Error loading token or profile:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      if (res.data?.token && res.data?.user) {
        await saveToken('userToken', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
      } else {
        throw new Error(res.data?.message || 'Login failed');
      }
    } catch (err) {
      console.log('Login error:', err);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await deleteToken('userToken');
      setToken(null);
      setUser(null);
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

  // Update profile in context and optionally backend
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser: updateUser, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
