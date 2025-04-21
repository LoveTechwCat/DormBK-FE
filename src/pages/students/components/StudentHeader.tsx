import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StudentHeader: FC = () => {
  const navigate = useNavigate();

  return (
    <div className='mb-6 flex items-start justify-between'>
      <div>
        <div className='mb-2 text-3xl font-bold text-gray-800'>
          Student Management
        </div>
        <p className='text-sm text-gray-600'>
          All student information in one place — organized and accessible.
        </p>
      </div>
      <Button
        className='bg-sky-500 hover:bg-sky-600'
        onClick={() => navigate('/students/add')}
      >
        Add student
      </Button>
    </div>
  );
};

export default StudentHeader;
