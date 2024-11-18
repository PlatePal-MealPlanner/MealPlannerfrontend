import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/Landin.jpg';
import logoImage from '../assets/platelogo.png';
import '../CSS/Register.css'; 

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      alert('Passwords do not match');
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

      alert('Registration successful!');
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="page-background">
      <div className="container">
        <img src={logoImage} alt="Logo" className="logo" />
        <h1 className="title">Sign Up</h1>

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
