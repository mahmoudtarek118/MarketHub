import React, { useState } from 'react';
import './SignUp.css';
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: 'buyer',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message); // Show success message
      } else {
        setMessage(result.message); // Show error message
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="main">
        <div className="signup">
          <label htmlFor="chk" className="signup-label">Sign Up</label>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          {message && <div>{message}</div>} {/* Show success or error message */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
