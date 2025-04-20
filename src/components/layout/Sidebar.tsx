import { FaThLarge, FaUser, FaBuilding, FaChartBar } from 'react-icons/fa';

const Sidebar = () => (
  <div className='h-full-screen w-64 bg-white text-gray-800 shadow-md'>
    <nav className='flex flex-col space-y-1 p-4'>
      <button className='flex items-center gap-3 rounded bg-blue-100 p-3 font-medium text-blue-800 shadow'>
        <FaThLarge className='text-lg' />
        <span className='text-sm'>Dashboard</span>
      </button>
      <button className='flex items-center gap-3 rounded p-3 text-gray-600 hover:bg-blue-100 hover:text-blue-800'>
        <FaUser className='text-lg' />
        <span className='text-sm'>Students</span>
      </button>
      <button className='flex items-center gap-3 rounded p-3 text-gray-600 hover:bg-blue-100 hover:text-blue-800'>
        <FaBuilding className='text-lg' />
        <span className='text-sm'>Rooms</span>
      </button>
      <button className='flex items-center gap-3 rounded p-3 text-gray-600 hover:bg-blue-100 hover:text-blue-800'>
        <FaChartBar className='text-lg' />
        <span className='text-sm'>Statistics</span>
      </button>
    </nav>
  </div>
);

export default Sidebar;
