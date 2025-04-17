type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className='flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg'>
    <div className='mb-4 rounded-full bg-blue-100 p-4'>
      <img src={icon} alt={title} className='h-8 w-8' />
    </div>
    <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
    <p className='text-gray-600'>{description}</p>
  </div>
);

export default FeatureCard;
