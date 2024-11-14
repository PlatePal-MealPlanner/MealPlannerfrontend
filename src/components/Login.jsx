import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios'; 
import backgroundImage from '../assets/Landin.jpg';
import logoImage from '../assets/platelogo.png'; 
import '../CSS/Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = { email, password };

      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', data, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      navigate('/Home'); 

    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setErrorMessage('Invalid email or password. Please try again.');
    }
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
        justifyContent: 'left',  
      }}
    >
      <div className="login-container">
        {/* Logo Image */}
        <img
          src={logoImage}
          alt="Logo"
          className="login-logo"
        />

        <h1 className="login-title">Sign In</h1>

        {/* Show error message if login fails */}
        {errorMessage && (
          <p className="login-error">{errorMessage}</p>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <div style={{ width: '100%', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button
            type="submit"
            className="login-submit-btn"
          >
            Sign In
          </button>
          <div className="login-signup">
            Don't have an account?{' '}
            <Link to="/register">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
