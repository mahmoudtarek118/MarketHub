import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  // Get the cart data passed via navigate
  const location = useLocation();
  const { cartItems, subtotal, tax, shipping, discount, total } = location.state || {};

  // Form state to manage the input values
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phoneNumber: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Handle input changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order submission
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Info:', paymentInfo);
    console.log('Order Summary:', { cartItems, subtotal, tax, shipping, discount, total });
    setIsOrderPlaced(true); // Mark order as placed
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="checkout-section">
          <h3>Shipping Information</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={shippingInfo.fullName}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingInfo.country}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={shippingInfo.zipCode}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={shippingInfo.phoneNumber}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div className="checkout-section">
          <h3>Payment Information</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiration Date (MM/YY)"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            required
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item: { id: string; title: string; price: number; quantity: number }) => (
                <li key={item.id}>
                  {item.title} - ${item.price} x {item.quantity}
                </li>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </ul>
          <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
          <h4>Tax: ${tax.toFixed(2)}</h4>
          <h4>Shipping: ${shipping.toFixed(2)}</h4>
          {discount > 0 && (
            <h4>Discount: -${((subtotal * discount) / 100).toFixed(2)}</h4>
          )}
          <h4>Total: ${total.toFixed(2)}</h4>
        </div>

        <button
          className={`place-order-button ${isOrderPlaced ? 'order-placed' : ''}`}
          type="submit"
        >
          {isOrderPlaced ? 'Order Placed!' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
