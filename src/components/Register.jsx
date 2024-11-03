// src/components/Register.jsx

import React from 'react';

const Register = () => {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Sign Up</h1>

      <div style={{ display: 'flex', width: '100%', gap: '10px', marginBottom: '15px' }}>
        {/* First Name Field */}
        <input
          type="text"
          placeholder="First Name"
          style={{
            flex: '1',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #88C057',
            fontSize: '1rem',
          }}
        />
        
        {/* Last Name Field */}
        <input
          type="text"
          placeholder="Last Name"
          style={{
            flex: '1',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #88C057',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Email Field */}
      <input
        type="email"
        placeholder="Email"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #88C057',
          marginBottom: '15px',
          fontSize: '1rem',
        }}
      />

      {/* Password Field */}
      <input
        type="password"
        placeholder="Password"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #88C057',
          marginBottom: '15px',
          fontSize: '1rem',
        }}
      />

      {/* Confirm Password Field */}
      <input
        type="password"
        placeholder="Confirm Password"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #88C057',
          marginBottom: '20px',
          fontSize: '1rem',
        }}
      />

      {/* Sign-Up Button */}
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
        Sign Up
      </button>

      {/* Additional Link */}
      <div style={{ fontSize: '0.85rem' }}>
        Already have an account? <a href="/login" style={{ color: '#333', textDecoration: 'underline' }}>SIGN IN</a>
      </div>
    </form>
  );
};

export default Register;
