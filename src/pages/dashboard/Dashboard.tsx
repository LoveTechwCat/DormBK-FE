import { FaUser, FaBuilding, FaChartBar } from 'react-icons/fa';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardCard from './components/DashboardCard';
import QuickActions from './components/QuickActions';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />

      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          <div className='p-8'>
            <h2 className='mb-2 text-2xl font-bold text-gray-800'>Dashboard</h2>
            <p className='mb-8 text-gray-600'>
              Simplify dormitory management with clarity and control.
            </p>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              <DashboardCard
                title='Student Management'
                description='View and manage student information, room assignments, and personal details.'
                icon={<FaUser />}
              />
              <DashboardCard
                title='Room Occupancy'
                description='Check room availability, occupancy rates, and manage room assignments.'
                icon={<FaBuilding />}
              />
              <DashboardCard
                title='Statistics'
                description='View statistics about student demographics, department distribution, and more.'
                icon={<FaChartBar />}
              />
            </div>

            <div className='mt-8'>
              <QuickActions />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
