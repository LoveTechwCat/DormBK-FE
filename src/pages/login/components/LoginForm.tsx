import React, { useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import LoginTextInput from './LoginTextInput';
import LoginSubmit from './LoginSubmit';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { errorMsg, handleLogin } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='bg-white p-8'>
        {errorMsg && (
          <div className='mb-4 text-center text-sm text-red-500'>
            {errorMsg}
          </div>
        )}
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
