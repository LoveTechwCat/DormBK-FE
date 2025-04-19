import logo from '@/assets/logo.svg';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-[#032B91] py-4 text-white">
      <div className="flex w-full items-center justify-between px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold">Dormitory Management System</span>
        </div>

        {/* User Icon */}
        <div>
          <FaUserCircle className="text-3xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;