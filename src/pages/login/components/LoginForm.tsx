import React, { useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import LoginTextInput from './LoginTextInput';
import LoginSubmit from './LoginSubmit';
import toast, { Toaster } from 'react-hot-toast';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, message } = await handleLogin(username, password);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit} className='bg-white p-8'>
        <LoginTextInput
          name='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginTextInput
          name='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginSubmit />
      </form>
    </div>
  );
};

export default LoginForm;
