import React from 'react';
import '../CSS/ShoppingList.css'; // Create this CSS file for styling if needed

const ShoppingList = () => {
  return (
    <div className="shoppinglist-container">
      <h1>Shopping List</h1>
      <p>Here is your shopping list, generated from your selected meals and recipes.</p>
      <div className="shoppinglist-content">
        <h2>Your Shopping List</h2>
        <ul>
          <li>Oats</li>
          <li>Chicken Breast</li>
          <li>Farro</li>
          <li>Tomato Sauce</li>
          <li>Vegetables</li>
          <li>Salmon</li>
          {/* Add more items dynamically or generate them based on user selections */}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
