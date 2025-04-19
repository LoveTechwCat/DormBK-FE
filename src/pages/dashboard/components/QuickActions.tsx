import { FaUserPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button'; // Import Button

const QuickActions = () => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <Button
        type="button"
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
        style={{ backgroundColor: '#1488DB' }}
      >
        <FaUserPlus />
        <p className="text-lg">Add new student</p>
      </Button>
    </div>
  );
};

export default QuickActions;