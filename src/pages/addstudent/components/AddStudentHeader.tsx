import { FC } from 'react';

const AddStudentHeader: FC = () => {
  return (
    <div>
      <div>
        <div className='mb-2 text-3xl font-bold text-gray-800'>
          Add new student
        </div>
        <p className='text-sm text-gray-600'>
          Add a new student to the dormitory management system. Required fields
          are worked with asterisk (*).
        </p>
      </div>
    </div>
  );
};

export default AddStudentHeader;
