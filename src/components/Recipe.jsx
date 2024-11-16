import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/leafbg.png'; // Background image
import logoImage from '../assets/platelogo.png'; // Logo image
import dropdownImage from '../assets/dropdown.png'; // Dropdown image
import '../CSS/Recipe.css'; // Import the CSS file

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch recipe data from the API/database
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes'); // Replace with your API endpoint
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

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
      className="recipe-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header Section */}
      <header className="recipe-header" style={{ backgroundColor: '#FEFF9F' }}>
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

      {/* Main content of the recipe page */}
      <div className="recipe-content">
        <h1>Recipe Collection</h1>
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
              <img src={recipe.imageURL} alt={recipe.title} className="recipe-image" />
              <h3 className="recipe-title">{recipe.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
