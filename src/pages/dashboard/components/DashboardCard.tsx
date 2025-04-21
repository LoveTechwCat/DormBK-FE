import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { CardProps } from './DashboardCardData';

const DashboardCard = ({ title, description, icon, path }: CardProps) => (
  <div className='w-full rounded-lg bg-white p-6 shadow-md'>
    <div className='mb-4 flex items-center justify-between'>
      <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
      <div className='text-2xl text-blue-500'>{icon}</div>
    </div>
    <p className='mb-4 text-sm text-gray-600'>{description}</p>
    <Link
      to={path}
      className='inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white shadow-md transition-colors'
      style={{ backgroundColor: '#1488DB' }}
    >
      <FaEye className='text-white' />
      <span className='text-lg text-white'>View</span>
    </Link>
  </div>
);

export default DashboardCard;
