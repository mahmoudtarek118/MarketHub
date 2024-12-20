import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import NavbarOther from '../components/NavbarOther';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './ShoppingCart.css';
import { toast } from 'react-toastify';
import shoes from '../assets/Shoes/{29BA62A7-D1EF-45F7-BC9E-B3A656A663BB}.png'; 


const ShoppingCart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleApplyCoupon = () => {
    if (couponCode === 'Ameen') {
      setDiscount(10); // Apply a 10% discount
      toast.success('Coupon applied! You saved 10%.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      toast.error('Invalid coupon code.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id);
    toast.info(`"${name}" removed from cart.`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const taxRate = 0.1;
  const shipping = cartItems.length > 0 ? 15 : 0; // Flat shipping rate
  const subtotal = calculateSubtotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping - (subtotal * discount) / 100;

  // Redirect to Checkout page
  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout', {
        state: {
          cartItems,        // Pass cart items
          subtotal,         // Pass subtotal
          tax,              // Pass tax
          shipping,         // Pass shipping
          discount,         // Pass discount
          total             // Pass total after discount
        },
      });
    } else {
      toast.error('Your cart is empty. Add some items to proceed.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <NavbarOther />
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={shoes} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className='text'>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.id, item.name)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2 className='text'>Order Summary</h2>
              <p className='text'>Subtotal: ${subtotal.toFixed(2)}</p>
              <p className='text'>Tax (10%): ${tax.toFixed(2)}</p>
              <p className='text'>Shipping: ${shipping.toFixed(2)}</p>
              {discount > 0 && <p className='text'>Discount: -${((subtotal * discount) / 100).toFixed(2)}</p>}
              <h3 className='text'>Total: ${total.toFixed(2)}</h3>
              <div className="coupon">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={handleApplyCoupon}>Apply</button>
              </div>
              <button className="checkout-button" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
