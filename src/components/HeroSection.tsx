import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleSellNow = () => {
    alert('Sell functionality will be implemented soon!');
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Welcome to <span>MarketHub</span></h1>
        <p>
          MarketHub is your one-stop destination to buy and sell quality products. 
          Discover the best deals on a wide range of items, or join our community of sellers 
          to showcase your products to thousands of shoppers.
        </p>
        <div className="hero-buttons">
          <button className="shop-now" onClick={handleShopNow}>Shop Now</button>
          <button className="sell-now" onClick={handleSellNow}>Sell Now</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
