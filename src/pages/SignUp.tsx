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
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    // Simple password strength evaluation (for demonstration)
    // You can make this more robust.
    if (password.length >= 10 && /[A-Z]/.test(password) && /\d/.test(password)) {
      setPasswordStrength('Strong');
    } else if (password.length >= 6) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a 10-digit phone number.';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          role: formData.role,
          password: formData.password,
        }),
      });

      const result = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        setMessage(result.message || 'Signup successful!');
        setFormData({
          username: '',
          email: '',
          phoneNumber: '',
          address: '',
          role: 'buyer',
          password: '',
          confirmPassword: ''
        });
        setPasswordStrength('');
      } else {
        setMessage(result.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      setMessage('A network error occurred. Please try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="signup-page">
      <div className="main">
        <div className="signup">
          
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                aria-label="Username"
                aria-invalid={errors.username ? 'true' : 'false'}
                required
              />
              {errors.username && <small>{errors.username}</small>}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                aria-label="Email"
                aria-invalid={errors.email ? 'true' : 'false'}
                required
              />
              {errors.email && <small>{errors.email}</small>}
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                aria-label="Phone Number"
                aria-invalid={errors.phoneNumber ? 'true' : 'false'}
                required
              />
              <span className="field-hint">Enter a 10-digit number, no dashes.</span>
              {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                aria-label="Address"
                aria-invalid={errors.address ? 'true' : 'false'}
                required
              />
              {errors.address && <small>{errors.address}</small>}
            </div>
            <div className="form-group">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                aria-label="Role"
                required
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              <span className="field-hint">Select Buyer or Seller role</span>
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                aria-label="Password"
                aria-invalid={errors.password ? 'true' : 'false'}
                required
              />
              <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <small>{errors.password}</small>}
              {formData.password && (
                <small className={`password-strength ${passwordStrength.toLowerCase()}`}>
                  Password Strength: {passwordStrength}
                </small>
              )}
            </div>
            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                required
              />
              {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          {message && <div className="message">{message}</div>}

          <div className="alternate-action">
            Already have an account? <a href="/login">Login here</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
