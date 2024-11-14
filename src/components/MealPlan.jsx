import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/leafbg.png'; // Background image
import logoImage from '../assets/platelogo.png'; // Logo image
import '../CSS/MealPlan.css'; // Import the CSS file

const MealPlan = () => {
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
          <Link to="/profile" className="home-nav-link">User Profile</Link>
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
