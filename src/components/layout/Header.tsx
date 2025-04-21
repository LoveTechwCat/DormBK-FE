import logo from '@/assets/logo.svg';
import Userbar from '@/components/layout/Userbar';
import { Button } from '../ui/button';

type HeaderProps = {
  variant?: 'login' | 'user';
};

const Header = ({ variant = 'user' }: HeaderProps) => {
  return (
    <header className='bg-[#032B91] py-4 text-white'>
      <div className='flex w-full items-center justify-between px-6'>
        {/* Logo and Title */}
        <div className='flex items-center space-x-3'>
          <img src={logo} alt='Logo' className='h-10 w-10' />
          <span className='text-2xl font-bold'>
            Dormitory Management System
          </span>
        </div>

        {/* Right Section */}
        {variant === 'user' ? (
          <Userbar />
        ) : (
          <a href='/login'>
            <Button className='rounded bg-[#1488DB] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#357ABD]'>
              Login
            </Button>
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
