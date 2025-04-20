import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className='mb-24 text-center'>
      <h1 className='mb-4 text-4xl font-bold text-[#032B91]'>
        Welcome to Dormitory Management System
      </h1>
      <p className='mb-8 text-xl text-gray-600'>
        A comprehensive platform for managing dormitory operations, student
        information, and facility maintenance.
      </p>
      <a href='/login'>
        <Button className='h-14 w-60 rounded bg-[#1488DB] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#357ABD]'>
          <p className='text-2xl'>Get Started</p>
        </Button>
      </a>
    </div>
  );
};

export default HeroSection;
