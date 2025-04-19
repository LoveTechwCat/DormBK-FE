import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';

const Home = () => {
  return (
    <div className='flex min-h-screen w-full flex-col bg-gradient-to-b from-blue-100 to-white'>
      <Header />

      <main className='container mx-auto flex-grow px-4 py-32'>
        <HeroSection />
        <FeatureCards />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
