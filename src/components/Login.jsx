// src/components/Login.jsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ toggleSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label style={{ width: '100%', marginBottom: '10px', textAlign: 'left' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>Username</p>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '15px',
            fontSize: '1rem',
          }}
          placeholder="Enter your username"
        />
      </label>

      <label style={{ width: '100%', marginBottom: '10px', textAlign: 'left', position: 'relative' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>Password</p>
        <input
          type={showPassword ? 'text' : 'password'}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '15px',
            fontSize: '1rem',
          }}
          placeholder="Enter your password"
        />

        {/* Show/Hide Password Icon */}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: '10px',
            top: '38px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#888',
          }}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </label>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
        <input type="checkbox" id="rememberMe" style={{ marginRight: '8px' }} />
        <label htmlFor="rememberMe" style={{ fontSize: '0.9rem', color: '#333' }}>Keep Me Signed In</label>
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
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

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem' }}>
        <a href="#" style={{ color: '#333', textDecoration: 'underline' }}>Forgot Password?</a>
        <a href="#" onClick={(e) => { e.preventDefault(); toggleSignUp(); }} style={{ color: '#333', textDecoration: 'underline' }}>
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default Login;
