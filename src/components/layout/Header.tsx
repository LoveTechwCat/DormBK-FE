import logo from '@/assets/logo.svg';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className='bg-[#032B91] py-4 text-white'>
      <div className='flex w-full items-center justify-between px-6'>
        <div className='flex items-center space-x-2'>
          <img src={logo} alt='Logo' className='h-10 w-10' />
          <span className='text-xl font-semibold'>
            Dormitory Management System
          </span>
        </div>

        <a href='/login'>
          <Button className='rounded bg-[#1488DB] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#357ABD]'>
            Login
          </Button>
        </a>
      </div>
    </header>
  );
};

export default Header;
