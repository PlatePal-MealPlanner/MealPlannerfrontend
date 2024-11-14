import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/leafbg.png'; // Background image
import logoImage from '../assets/platelogo.png'; // Logo image
import '../CSS/Recipe.css';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div
      className="recipe-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header Section */}
      <header className="recipe-header" style={{ backgroundColor: '#FEFF9F' }}>
        <Link to="/home" className="home-logo-link">
          <img src={logoImage} alt="Logo" className="home-logo" />
        </Link>
        
        <nav className="home-nav">
          <Link to="/mealplan" className="home-nav-link">Meal Plan</Link>
          <Link to="/shoppinglist" className="home-nav-link">Shopping List</Link>
          <Link to="/recipe" className="home-nav-link">Recipe</Link>
          <Link to="/profile" className="home-nav-link">User Profile</Link>
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
