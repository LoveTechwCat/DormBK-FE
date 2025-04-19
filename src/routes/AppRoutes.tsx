// src/routes/AppRoutes.tsx
import { RouteObject } from 'react-router-dom';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Dashboard from '@/pages/dashboard/Dashboard';


export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];
