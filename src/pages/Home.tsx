import React from 'react';
import Navbar from '../components/NavbarHome';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Footer />
      
    </div>
  );
};

export default Home;
