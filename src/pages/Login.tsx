import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // Using react-router's useNavigate and Link for redirect
import './LogIn.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare the login data
    const loginData = {
      email: email,
      password: password
    };

    try {
      // Make POST request to Flask backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // If login successful, redirect to the products page or another route
        console.log("Login successful:", result.message);
        navigate("/products");  // Use react-router to navigate
      } else {
        // If login failed, display the error
        setError(result.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="content">
      <h2 className="title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Email</span>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Login" />
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
