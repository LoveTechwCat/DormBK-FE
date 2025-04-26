import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '@/contexts/auth/useAuth';
import { User } from '@/contexts/auth/types';

export const useLogin = () => {
  const { setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (
    username: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    if (!username.trim() || !password.trim()) {
      const msg = 'Username and password are required';
      return { success: false, message: msg };
    }

    try {
      const response = await login(username.trim(), password.trim());
      const data = response as { user: User; token: string };

      setIsAuthenticated(true);
      setUser(data.user);

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));

      navigate('/dashboard');
      return { success: true, message: 'Login successful' };
    } catch (err) {
      const msg = (err as Error).message || 'Login failed';
      return { success: false, message: msg };
    }
  };

  return { handleLogin };
};
