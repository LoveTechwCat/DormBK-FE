import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StudentHeader: FC = () => {
  const navigate = useNavigate();

  return (
    <div className='mb-6 flex items-start justify-between'>
      <div>
        <div className='mb-2 text-3xl font-bold text-gray-800'>
          Students Management
        </div>
        <p className='text-[16px] text-gray-600'>
          All students' information in one place — organized and accessible.
        </p>
      </div>
      <Button
        className='mr-8 bg-sky-500 hover:bg-sky-600'
        onClick={() => navigate('/students/add')}
      >
        Add student
      </Button>
    </div>
  );
};

export default StudentHeader;
