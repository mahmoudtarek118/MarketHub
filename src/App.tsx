import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider from context

import NavbarOther from './components/NavbarOther';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home'; // Your home page component
import Products from './pages/ProductListing'; // Import your Products component
import Cart from './pages/ShoppingCart'; // Import your Cart component
import AboutUs from './pages/AboutUsPage'; // Import your AboutUs component
import Profile from './pages/Profile'; // Import the Profile component
const App: React.FC = () => {
  const isAuthenticated = false;  // Replace with your authentication logic

  return (
    <CartProvider> {/* Wrap your entire application in CartProvider */}
      <Router>
        {/* Conditionally render the correct navbar */}
        
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/products" element={<Products />} />  {/* Route for products */}
            <Route path="/cart" element={<Cart />} />          {/* Route for cart */}
            <Route path="/about" element={<AboutUs />} />      {/* Route for about us */}
            <Route path="/profile" element={<Profile />} /> {/* Add Profile Route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
