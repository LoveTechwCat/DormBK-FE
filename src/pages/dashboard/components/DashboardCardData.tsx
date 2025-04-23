import { ReactNode } from 'react';
import { FaUser, FaBuilding, FaChartBar } from 'react-icons/fa';

export interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
}

export const Cards: CardProps[] = [
  {
    title: 'Student Management',
    description:
      'View and manage student information, room assignments, and personal details.',
    icon: <FaUser />,
    path: '/students',
  },
  {
    title: 'Room Occupancy',
    description:
      'Check room availability, occupancy rates, and manage room assignments.',
    icon: <FaBuilding />,
    path: '/rooms',
  },
  {
    title: 'Statistics',
    description:
      'View statistics about student demographics, department distribution, and more.',
    icon: <FaChartBar />,
    path: '/statistics',
  },
];
