'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AddStudentHeader from './components/AddStudentHeader';
import AddStudentForm from './components/AddStudentForm';

const AddStudent = () => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          <div className='p-8'>
            <div className='mb-6 flex items-start justify-between'>
              <AddStudentHeader />
            </div>
            <AddStudentForm />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AddStudent;
