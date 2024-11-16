import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/leafbg.png'; // Background image
import logoImage from '../assets/platelogo.png'; // Logo image
import dropdownImage from '../assets/dropdown.png'; // Dropdown image
import '../CSS/ShoppingList.css'; // Import the CSS file

const ShoppingList = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown open state
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div
      className="shoppinglist-container"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set the background image inline
    >
      {/* Header Section */}
      <header className="shoppinglist-header" style={{ backgroundColor: '#FEFF9F' }}>
        {/* Logo or Home Link */}
        <Link to="/home" className="home-logo-link">
          <img src={logoImage} alt="Logo" className="home-logo" />
        </Link>
        
        {/* Navigation bar */}
        <nav className="home-nav">
          <Link to="/mealplan" className="home-nav-link">Meal Plan</Link>
          <Link to="/shoppinglist" className="home-nav-link">Shopping List</Link>
          <Link to="/recipe" className="home-nav-link">Recipe</Link>
          
          {/* Profile Dropdown */}
          <div className="profile-dropdown">
            <img
              src={dropdownImage}
              alt="User Profile"
              className="dropdown-button"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">View Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main content of the shopping list page */}
      <div className="shoppinglist-content">
        <h1>Shopping List</h1>
        <p>Here is your shopping list, generated from your selected meals and recipes.</p>
        <h2>Your Shopping List</h2>
        <ul>
          <li>Oats</li>
          <li>Chicken Breast</li>
          <li>Farro</li>
          <li>Tomato Sauce</li>
          <li>Vegetables</li>
          <li>Salmon</li>
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
