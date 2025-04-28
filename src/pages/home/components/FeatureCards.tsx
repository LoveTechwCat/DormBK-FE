import FeatureCard from './FeatureCard';
import { FaBuilding, FaShieldAlt, FaUser } from 'react-icons/fa';

const FeatureCards = () => (
  <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-3'>
    <FeatureCard
      icon={<FaUser />}
      title='Students Management'
      description='Efficiently manage student information, room assignments, and personal records.'
    />
    <FeatureCard
      icon={<FaBuilding />}
      title='Room Occupancy'
      description='Monitor room availability, occupancy rates, and manage room assignments.'
    />
    <FeatureCard
      icon={<FaShieldAlt />}
      title='Administrative Tools'
      description='Powerful tools for administrators to monitor and manage the entire dormitory system.'
    />
  </div>
);

export default FeatureCards;
