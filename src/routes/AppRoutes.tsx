// src/routes/AppRoutes.tsx
import { RouteObject } from 'react-router-dom';
import Home from '@/pages/home/Home';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];
