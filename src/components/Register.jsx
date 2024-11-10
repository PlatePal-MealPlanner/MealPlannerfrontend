import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios'; // Import axios for making HTTP requests
import backgroundImage from '../assets/Landin.jpg';  // Import your background image
import logoImage from '../assets/platelogo.png'; // Import your logo image

const Register = () => {
  const navigate = useNavigate(); // Hook for programmatically navigating

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object from the form
    const formData = new FormData(e.target);
  
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Prepare data for API request
    const data = {
      fname: formData.get('firstName'),
      lname: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
  
    try {
      // Send a POST request to the registration API with headers
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', data, {
        headers: {
          'Content-Type': 'application/json', // Ensure the request is sent as JSON
        },
      });
  
      // Handle successful registration
      alert('Registration successful!');
      localStorage.setItem('token', response.data.token); // Save token to local storage
      navigate('/login'); // Navigate to login page after registration
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };
  

  // Shared container style (same as Login.jsx)
  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly less opacity to let the background show
    padding: '40px',
    borderRadius: '30px',
    width: '650px',  // Same width for consistency
    minHeight: '700px', // Adjusted height
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '30px', // Align to the left
    top: '50%',
    transform: 'translateY(-50%)', // Center vertically
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left', // Align content to the left
      }}
    >
      <div style={containerStyle}>
        {/* Logo Image */}
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: '200px', marginBottom: '20px' }} // Adjust width as needed
        />

        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Sign Up</h1>

        {/* Register form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', width: '103%', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              style={{
                flex: '1',
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid #88C057',
                fontSize: '1rem',
              }}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              style={{
                flex: '1',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #88C057',
                fontSize: '1rem',
              }}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #88C057',
              marginBottom: '15px',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #88C057',
              marginBottom: '15px',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #88C057',
              marginBottom: '20px',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              width: '35%',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Sign Up
          </button>
          <div style={{ fontSize: '0.85rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#333', textDecoration: 'underline' }}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
