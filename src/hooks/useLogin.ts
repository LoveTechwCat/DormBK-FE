import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export const useLogin = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    if (!username.trim() || !password) {
      setErrorMsg('Username and password are required');
      return;
    }

    try {
      await login(username.trim(), password);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return { errorMsg, handleLogin };
};
