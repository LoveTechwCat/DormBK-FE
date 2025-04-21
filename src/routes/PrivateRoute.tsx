import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/useAuth';
import React, { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // hoặc spinner
  }

  return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
