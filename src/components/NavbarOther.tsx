import React from "react";
import { motion } from "framer-motion";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NavbarOther: React.FC = () => {
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="logo">MarketHub</div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <button className="btn logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <></>
        )}
      </div>
    </motion.header>
  );
};

export default NavbarOther;
