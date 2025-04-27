import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleAddStudent = () => {
    navigate('/students/add');
  };

  return (
    <div className='mt-4'>
      <h3 className='mb-4 text-lg font-semibold text-gray-800'>
        Quick Actions
      </h3>

      <div
        onClick={handleAddStudent}
        className='flex w-fit cursor-pointer flex-col items-center rounded-lg bg-[#1488DB] px-[136px] py-5 font-semibold text-white shadow-md transition-colors hover:bg-blue-700'
      >
        <FaUserPlus />
        <p className='text-lg'>Add new student</p>
      </div>
    </div>
  );
};

export default QuickActions;
