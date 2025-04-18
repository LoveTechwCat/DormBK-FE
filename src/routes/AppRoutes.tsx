// src/routes/AppRoutes.tsx
import { RouteObject } from 'react-router-dom';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];
