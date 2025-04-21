import logo from '@/assets/logo.svg';
import githubIcon from '@/assets/github-icon.svg';

const Footer = () => {
  return (
    <footer className='w-full bg-[#0A2678] py-4 text-white'>
      <div className='text-sm` flex items-center justify-between px-6'>
        <div className='flex items-center space-x-2'>
          <img src={logo} alt='Logo' className='h-8 w-8' />
          <span>
            Dormitory Management System - © 2025 by Database L03 - Team 08
          </span>
        </div>

        <a
          href='https://github.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:opacity-80'
        >
          <img src={githubIcon} alt='GitHub' className='h-8 w-8' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
