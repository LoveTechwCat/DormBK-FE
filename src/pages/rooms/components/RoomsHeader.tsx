import { FC } from 'react';

const RoomHeader: FC = () => {
  return (
    <div className='mb-6'>
      <div className='mb-2 text-3xl font-bold text-gray-800'>
        Room Management
      </div>
      <p className='text-sm text-gray-600'>
        Manage all dormitory rooms efficiently.
      </p>
    </div>
  );
};

export default RoomHeader;
