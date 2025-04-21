import logo from '@/assets/logo.svg';
import { Button } from '../ui/button';
import { FaUserCircle } from 'react-icons/fa';

type HeaderProps = {
  variant?: 'default' | 'user';
};

const Header = ({ variant = 'default' }: HeaderProps) => {
  return (
    <header className='bg-[#032B91] py-4 text-white'>
      <div className='flex w-full items-center justify-between px-6'>
        <div className='flex items-center space-x-3'>
          <img src={logo} alt='Logo' className='h-10 w-10' />
          <span className='text-2xl font-bold'>
            Dormitory Management System
          </span>
        </div>

        {variant === 'default' ? (
          <a href='/login'>
            <Button className='rounded bg-[#1488DB] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#357ABD]'>
              Login
            </Button>
          </a>
        ) : (
          <FaUserCircle className='text-3xl' />
        )}
      </div>
    </header>
  );
};

export default Header;
