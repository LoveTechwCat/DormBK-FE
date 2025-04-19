import { FaUser, FaBuilding, FaChartBar } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import QuickActions from './components/QuickActions';
import Footer from './components/Footer';

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-600 mb-8">
            Simplify dormitory management with clarity and control.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Student Management"
              description="View and manage student information, room assignments, and personal details."
              icon={<FaUser />}
            />
            <DashboardCard
              title="Room Occupancy"
              description="Check room availability, occupancy rates, and manage room assignments."
              icon={<FaBuilding />}
            />
            <DashboardCard
              title="Statistics"
              description="View statistics about student demographics, department distribution, and more."
              icon={<FaChartBar />}
            />
          </div>
          <div className="mt-8">
            <QuickActions />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;