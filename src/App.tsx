import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Ensure correct import path
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ShoppingCart from './pages/ShoppingCart';
import CheckoutPage from './pages/CheckoutPage';


const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer /> {/* Add ToastContainer to the top level of the app */}
      <CartProvider> {/* Ensure all routes needing useCart are wrapped */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </CartProvider>

    </Router>
  );
};

export default App;
