import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainSection from './components/MainSection';
import { Toaster } from 'react-hot-toast';

const Statistics = () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Toaster />
      <Header variant='user' />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          <div className='p-8'>
            <h2 className='mb-2 text-3xl font-bold text-gray-800'>
              Statistics
            </h2>
            <p className='mb-8 text-gray-600'>
              View statistics about student demographics, department
              distribution, and more.
            </p>

            <MainSection />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Statistics;
