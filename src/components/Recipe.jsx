import React from 'react';
import '../CSS/Recipe.css'; // Create this CSS file for styling if needed

const Recipe = () => {
  return (
    <div className="recipe-container">
      <h1>Recipe</h1>
      <p>Explore our diverse collection of recipes to plan your meals for the week.</p>
      <div className="recipe-content">
        <h2>Recipe List</h2>
        <ul>
          <li>Quick Cooking Oats</li>
          <li>Green Goddess Farro Bowl</li>
          <li>Cabbage Roll Casserole</li>
          <li>Crispy Baked Catfish</li>
          {/* Add more recipes or fetch them from a database/API */}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;
