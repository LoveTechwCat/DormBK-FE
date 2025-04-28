import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickActions from './components/QuickActions';
import DashboardCard from './components/DashboardCard';
import { Cards } from './components/DashboardCardData';

const Dashboard = () => (
  <div className='flex min-h-screen flex-col'>
    <Header />
    <div className='flex flex-1'>
      <Sidebar />
      <main className='flex flex-1 flex-col justify-between bg-gray-100'>
        <div className='p-8'>
          <h2 className='mb-2 text-3xl font-bold text-gray-800'>Dashboard</h2>
          <p className='mb-8 text-gray-600'>
            Simplify dormitory management with clarity and control.
          </p>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {Cards.map((card) => (
              <DashboardCard key={card.title} {...card} />
            ))}
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

export default Dashboard;
