import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import backgroundImage from '../assets/Landin.jpg'; // Your background image
import logoImage from '../assets/platelogo.png'; // Your logo image

const Home = () => {
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
        justifyContent: 'center',  // Center content
        flexDirection: 'column',   // Align items vertically
      }}
    >
      {/* Logo Image */}
      <img
        src={logoImage}
        alt="Logo"
        style={{ width: '150px', marginBottom: '20px' }} // Adjust logo size as needed
      />

      {/* Welcome Text */}
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>
        Welcome to Our Platform!
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '30px' }}>
        Please Sign In to continue.
      </p>

      {/* Sign In Button */}
      <Link to="/login">
        <button
          style={{
            padding: '12px 30px',
            fontSize: '1.2rem',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default Home;