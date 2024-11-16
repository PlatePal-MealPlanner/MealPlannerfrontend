import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/leafbg.png'; // Background image
import logoImage from '../assets/platelogo.png'; // Logo image
import dropdownImage from '../assets/dropdown.png'; // Dropdown image
import '../CSS/MealPlan.css'; // Import the CSS file

const MealPlan = () => {
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
      className="mealplan-container"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set the background image inline
    >
      {/* Header Section */}
      <header className="mealplan-header" style={{ backgroundColor: '#FEFF9F' }}>
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

      {/* Main content of the meal plan page */}
      <div className="mealplan-content">
        <h1>Meal Plan</h1>
        <p>Welcome to your personalized meal plan. Here you can organize meals for your week.</p>
        <h2>Your Weekly Plan</h2>
        <ul>
          <li>Monday: Grilled Chicken Salad</li>
          <li>Tuesday: Spaghetti Bolognese</li>
          <li>Wednesday: Quinoa and Veggie Stir-fry</li>
          <li>Thursday: Chicken Tacos</li>
          <li>Friday: Salmon with Rice</li>
          <li>Saturday: Beef Steak and Vegetables</li>
          <li>Sunday: Pancakes with Fresh Fruit</li>
        </ul>
      </div>
    </div>
  );
};

export default MealPlan;
