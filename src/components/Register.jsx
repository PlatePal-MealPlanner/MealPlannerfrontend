import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/Landin.jpg';
import logoImage from '../assets/platelogo.png';
import '../CSS/Register.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); // State for success or error message
  const [messageType, setMessageType] = useState(''); // Type of message: 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    const data = {
      fname: formData.get('firstName'),
      lname: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('Registration successful! Redirecting to login...');
      setMessageType('success');
      localStorage.setItem('token', response.data.token);

      // Redirect after a short delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      setMessage('Registration failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="page-background">
      <div className="container">
        <img src={logoImage} alt="Logo" className="logo" />
        <h1 className="title">Sign Up</h1>

        {/* Display success or error message */}
        {message && (
          <div className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="input-field"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="input-field"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input-field"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <div className="link">
            Already have an account?{' '}
            <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
