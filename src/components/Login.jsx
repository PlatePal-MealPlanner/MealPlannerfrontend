// src/components/Login.jsx

import React from 'react';

const Login = () => {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Username Field */}
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

      {/* Password Field */}
      <label style={{ width: '100%', marginBottom: '10px', textAlign: 'left' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>Password</p>
        <input
          type="password"
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
      </label>

      {/* "Keep Me Signed In" Checkbox */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
        <input type="checkbox" id="rememberMe" style={{ marginRight: '8px' }} />
        <label htmlFor="rememberMe" style={{ fontSize: '0.9rem', color: '#333' }}>Keep Me Signed In</label>
      </div>

      {/* Sign-In Button */}
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

      {/* Additional Links */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem' }}>
        <a href="#" style={{ color: '#333', textDecoration: 'underline' }}>Forgot Password?</a>
        <a href="#" style={{ color: '#333', textDecoration: 'underline' }}>Sign Up</a>
      </div>
    </form>
  );
};

export default Login;
