import { FaThLarge, FaUser, FaBuilding, FaChartBar } from 'react-icons/fa';

const Sidebar = () => (
  <div className="w-64 bg-white text-gray-800 h-full shadow-md">
    <nav className="space-y-1 p-4">
      {/* Active button */}
      <button className="flex items-center gap-3 p-3 rounded bg-blue-100 text-blue-800 font-medium shadow">
        <FaThLarge className="text-lg" />
        <span className="text-sm">Dashboard</span>
      </button>
      {/* Other buttons */}
      <button className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 hover:text-blue-800 text-gray-600">
        <FaUser className="text-lg" />
        <span className="text-sm">Students</span>
      </button>
      <button className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 hover:text-blue-800 text-gray-600">
        <FaBuilding className="text-lg" />
        <span className="text-sm">Rooms</span>
      </button>
      <button className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 hover:text-blue-800 text-gray-600">
        <FaChartBar className="text-lg" />
        <span className="text-sm">Statistics</span>
      </button>
    </nav>
  </div>
);

export default Sidebar;