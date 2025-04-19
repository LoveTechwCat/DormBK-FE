import { ReactNode } from 'react';
import { Button } from '@/components/ui/button'; // Import Button
import { FaEye } from 'react-icons/fa'; // Import an icon for the button

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const DashboardCard: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="text-blue-500 text-2xl">{icon}</div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <Button
        type="button"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
        style={{ backgroundColor: '#1488DB' }}
      >
        <FaEye />
        <p className="text-lg">View</p>
      </Button>
    </div>
  );
};

export default DashboardCard;