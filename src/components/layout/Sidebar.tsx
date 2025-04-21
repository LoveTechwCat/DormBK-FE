import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { FaThLarge, FaUser, FaBuilding, FaChartBar } from 'react-icons/fa';

type NavItemProps = {
  path: string;
  icon: ReactNode;
  label: string;
};

const navItems: NavItemProps[] = [
  { path: '/dashboard', icon: <FaThLarge />, label: 'Dashboard' },
  { path: '/students', icon: <FaUser />, label: 'Students' },
  { path: '/rooms', icon: <FaBuilding />, label: 'Rooms' },
  { path: '/statistics', icon: <FaChartBar />, label: 'Statistics' },
];

const Sidebar = () => (
  <div className='h-full-screen w-64 bg-white text-gray-800 shadow-md'>
    <nav className='flex flex-col space-y-1 p-4'>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className='flex items-center gap-3 rounded p-3 font-medium transition-colors'
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#CCE4FF' : 'transparent',
            color: isActive ? '#032B91' : '#1e2939',
          })}
        >
          <div className='text-lg'>{item.icon}</div>
          <span className='text-base'>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </div>
);

export default Sidebar;
