import React from 'react';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
import LoginFooter from './components/LoginFooter';

const Login: React.FC = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-blue-100'>
      <div className='w-[640px] overflow-hidden rounded-lg shadow-md'>
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
