import studentManagementIcon from '@/assets/students.svg';
import roomOccupancyIcon from '@/assets/room.svg';
import adminToolsIcon from '@/assets/shield.svg';
import FeatureCard from './FeatureCard';

const FeatureCards = () => (
  <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-3'>
    <FeatureCard
      icon={studentManagementIcon}
      title='Student Management'
      description='Efficiently manage student information, room assignments, and personal records.'
    />
    <FeatureCard
      icon={roomOccupancyIcon}
      title='Room Occupancy'
      description='Monitor room availability, occupancy rates, and manage room assignments.'
    />
    <FeatureCard
      icon={adminToolsIcon}
      title='Administrative Tools'
      description='Powerful tools for administrators to monitor and manage the entire dormitory system.'
    />
  </div>
);

export default FeatureCards;
