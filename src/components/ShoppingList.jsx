import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/leafbg.png'; // Background image
import logoImage from '../assets/platelogo.png'; // Logo image
import '../CSS/ShoppingList.css'; // Import the CSS file

const ShoppingList = () => {
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
        
        {/* Navigation bar, add more links if needed */}
        <nav className="home-nav">
          <Link to="/mealplan" className="home-nav-link">Meal Plan</Link>
          <Link to="/shoppinglist" className="home-nav-link">Shopping List</Link>
          <Link to="/recipe" className="home-nav-link">Recipe</Link>
          <Link to="/profile" className="home-nav-link">User Profile</Link>
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
