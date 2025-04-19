import logo from '@/assets/logo.svg';
import githubIcon from '@/assets/github-icon.svg';

interface FooterProps {
  variant?: 'full' | 'half';
}

const Footer: React.FC<FooterProps> = ({ variant = 'full' }) => {
  const isHalf = variant === 'half';

  return (
    <footer className='mt-auto bg-[#0A2678] py-4 text-white'>
      <div
        className={`${
          isHalf ? 'ml-auto max-w-[calc(100%-250px)]' : 'w-full'
        } flex items-center justify-between px-6 text-sm`}
      >
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
