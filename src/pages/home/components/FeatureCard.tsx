import { ReactNode } from 'react';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className='flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg'>
    <div className='mb-4 rounded-full bg-blue-100 p-4'>
      <div className='text-3xl text-blue-500'>{icon}</div>
    </div>
    <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
    <p className='text-gray-600'>{description}</p>
  </div>
);

export default FeatureCard;
