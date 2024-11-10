import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate from react-router-dom
import axios from 'axios';  // Import axios for making API requests
import backgroundImage from '../assets/Landin.jpg';
import logoImage from '../assets/platelogo.png'; // Import your logo image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent in the request
      const data = { email, password };

      // Make a POST request to the login API
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', data, {
        headers: {
          'Content-Type': 'application/json', // Ensure the request is sent as JSON
        },
      });

      // Assuming the response contains a token
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Navigate to another page after successful login
      navigate('/dashboard'); // Adjust the path as needed for your project

    } catch (error) {
      // Handle errors (e.g., invalid credentials, server errors)
      console.error('Login failed:', error.response?.data || error.message);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  // Style for the main container to keep it fixed on the left
  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly less opacity to let the background show
    padding: '40px',
    borderRadius: '30px',
    width: '650px', // Reduced width for a smaller form
    minHeight: '700px', // Adjusted height
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '30px',  // Fixed to the left side of the screen
    top: '50%',
    transform: 'translateY(-50%)', // Center the form vertically
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
        justifyContent: 'left',  // Align the content to the left
      }}
    >
      <div style={containerStyle}>
        {/* Logo Image */}
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: '200px', marginBottom: '20px' }} // Adjust width as needed
        />

        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Sign In</h1>

        {/* Show error message if login fails */}
        {errorMessage && (
          <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '95%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginBottom: '15px',
              fontSize: '1rem',
            }}
          />
          <div style={{ width: '100%', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '95%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginBottom: '15px',
                fontSize: '1rem',
              }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#888',
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
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
            Sign In
          </button>
          <div style={{ fontSize: '0.85rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#333', textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
