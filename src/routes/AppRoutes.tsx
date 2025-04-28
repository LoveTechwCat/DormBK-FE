// src/routes/AppRoutes.tsx
import { RouteObject } from 'react-router-dom';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Dashboard from '@/pages/dashboard/Dashboard';
import PrivateRoute from '@/routes/PrivateRoute';
import Students from '@/pages/students/Students';
import Statistics from '@/pages/statistics/Statistics';
import AddStudent from '@/pages/addstudent/AddStudent';
import Rooms from '@/pages/rooms/Rooms';

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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/students',
    element: (
      <PrivateRoute>
        <Students />
      </PrivateRoute>
    ),
  },
  {
    path: '/students/:ssn',
    element: (
      <PrivateRoute>
        <Students />
      </PrivateRoute>
    ),
  },
  {
    path: '/statistics',
    element: (
      <PrivateRoute>
        <Statistics />
      </PrivateRoute>
    ),
  },
  {
    path: '/students/add',
    element: (
      <PrivateRoute>
        <AddStudent />
      </PrivateRoute>
    ),
  },
  {
    path: '/rooms',
    element: (
      <PrivateRoute>
        <Rooms />
      </PrivateRoute>
    ),
  },
];
