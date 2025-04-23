import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '@/contexts/auth/useAuth';
import { User } from '@/contexts/auth/types';

export const useLogin = () => {
  const { setIsAuthenticated, setUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username and password are required');
      return;
    }

    try {
      const response = await login(username.trim(), password.trim());
      const data = response as { user: User; token: string };

      setIsAuthenticated(true);
      setUser(data.user);

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg((err as Error).message || 'Login failed');
    }
  };

  return { errorMsg, handleLogin };
};
