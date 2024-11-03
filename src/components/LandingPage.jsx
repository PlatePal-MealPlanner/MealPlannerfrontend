// src/components/LandingPage.jsx

import React, { useState } from 'react';
import Login from './Login';
import backgroundImage from '../assets/Landin.jpg';

const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => setIsSignUp(!isSignUp);

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
          maxWidth: '800px', // Adjusted width to match the prototype
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h1>

        {/* Conditional Rendering for Login or Register */}
        <main>
          {isSignUp ? (
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', width: '100%', gap: '10px', marginBottom: '15px' }}>
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

              <div style={{ fontSize: '0.85rem' }}>
                Already have an account?{' '}
                <a href="#" onClick={toggleSignUp} style={{ color: '#333', textDecoration: 'underline' }}>
                  Sign In
                </a>
              </div>
            </form>
          ) : (
            <Login toggleSignUp={toggleSignUp} />
          )}
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
