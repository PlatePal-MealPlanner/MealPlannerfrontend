// src/components/LandingPage.jsx

import React from 'react';
import Login from './Login';
import backgroundImage from '../assets/Landin.jpg';

const LandingPage = () => {
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
        paddingLeft: '30px', // Align the box away from the left side
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust opacity
          padding: '250px', // Padding for internal spacing
          borderRadius: '30px', // Increased border radius
          maxWidth: '800hvs', // Adjusted width to match the prototype
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Header Section */}
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Sign In</h1>

        {/* Login Form */}
        <main>
          <Login />
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
