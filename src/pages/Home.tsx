import React from 'react';
import NavbarHome from '../components/NavbarHome';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <NavbarHome />
      <HeroSection />
      <Footer />
      
    </div>
  );
};

export default Home;
