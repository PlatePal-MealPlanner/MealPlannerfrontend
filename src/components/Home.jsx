import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/leafbg.png'; // Background image
import logoImage from '../assets/platelogo.png'; // Logo image
import '../CSS/Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header: Logo and Navigation */}
      <header className="home-header">
        {/* Clickable Logo */}
        <Link to="/home" className="home-logo-link">
          <img
            src={logoImage}
            alt="Logo"
            className="home-logo"
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="home-nav">
          <Link to="/mealplan" className="home-nav-link">Meal Plan</Link>
          <Link to="/shoppinglist" className="home-nav-link">Shopping List</Link>
          <Link to="/recipe" className="home-nav-link">Recipe</Link>
          <Link to="/profile" className="home-nav-link">User Profile</Link>
        </nav>
      </header>

      {/* Welcome Text and Logout Button */}
      <div className="home-content">
        <h1 className="home-title">Welcome to Our Platform!</h1>
        <p className="home-subtitle">
          Explore our meal plans, shopping lists, recipes, and manage your profile. 
          Please sign in to continue enjoying our services.
        </p>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="home-logout-btn"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
