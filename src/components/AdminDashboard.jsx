import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserModal from './UpdateUserModal'; // Import UpdateUserModal
import UpdateRecipeModal from './UpdateRecipeModal'; // Import UpdateRecipeModal

const AdminDashboard = () => {
  const [data, setData] = useState([]); // State to store users
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    prepTime: '',
    nutritionInfo: '',
    cuisineType: '',
    mealType: '',
    ratingsAverage: '',
  });

  const [showUserModal, setShowUserModal] = useState(false); // User modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // User for update
  const [showRecipeModal, setShowRecipeModal] = useState(false); // Recipe modal visibility
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Recipe for update
  const [validationMessage, setValidationMessage] = useState('');
  // Fetch users and recipes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get(
          'http://localhost:8080/api/v1/admin/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const recipeResponse = await axios.get(
          'http://localhost:8080/api/recipe/allrecipe',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(userResponse.data || []); // Ensure users data is an array
        setRecipes(recipeResponse.data || []); // Ensure recipes data is an array
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new recipe
  const handleAddRecipe = async () => {
    // Check if all fields are filled
    if (
      !newRecipe.title ||
      !newRecipe.description ||
      !newRecipe.ingredients ||
      !newRecipe.prepTime ||
      !newRecipe.nutritionInfo ||
      !newRecipe.cuisineType ||
      !newRecipe.mealType ||
      !newRecipe.ratingsAverage
    ) {
      setValidationMessage('Please fill out all fields before adding the recipe.');
      return; // Stop execution if validation fails
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/recipe/addrecipe',
        newRecipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipes([...recipes, response.data]); // Append new recipe
      setNewRecipe({
        title: '',
        description: '',
        ingredients: '',
        prepTime: '',
        nutritionInfo: '',
        cuisineType: '',
        mealType: '',
        ratingsAverage: '',
      });
      setValidationMessage(''); // Clear validation message on success
    } catch (err) {
      console.error('Error adding recipe:', err);
      setError('Failed to add recipe.');
    }
  };

  // Handle recipe updates via modal
  const handleOpenRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedRecipe(null);
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/recipe/update/${updatedRecipe.recipeId}`,
        updatedRecipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedRecipes = recipes.map((recipe) =>
        recipe.recipeId === updatedRecipe.recipeId ? response.data : recipe
      );
      setRecipes(updatedRecipes);
      handleCloseRecipeModal();
    } catch (err) {
      console.error('Error updating recipe:', err);
      setError('Failed to update recipe.');
    }
  };

  // Handle deleting a recipe
  const handleDeleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/recipe/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe.recipeId !== id));
    } catch (err) {
      console.error('Error deleting recipe:', err);
      setError('Failed to delete recipe.');
    }
  };

  // Handle user updates via modal
  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/users/${updatedUser.userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUsers = data.map((user) =>
        user.userId === updatedUser.userId ? response.data : user
      );
      setData(updatedUsers);
      handleCloseUserModal();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user.');
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((user) => user.userId !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>User Management</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleOpenUserModal(user)}>Update</button>
                <button onClick={() => handleDeleteUser(user.userId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Recipe Management</h2>

<h3>Add New Recipe</h3>
<div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
  {validationMessage && (
    <div style={{ color: 'red', marginBottom: '15px' }}>{validationMessage}</div>
  )}
  <label style={{ marginBottom: '5px' }}>Title:</label>
  <input
    type="text"
    placeholder="Title"
    value={newRecipe.title}
    onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
    style={{ marginBottom: '15px', padding: '8px' }}
  />

  <label style={{ marginBottom: '5px' }}>Description:</label>
  <textarea
    placeholder="Description"
    value={newRecipe.description}
    onChange={(e) =>
      setNewRecipe({ ...newRecipe, description: e.target.value })
    }
    style={{ marginBottom: '15px', padding: '8px', height: '80px' }}
  />

  <label style={{ marginBottom: '5px' }}>Ingredients:</label>
  <input
    type="text"
    placeholder="Ingredients (comma-separated)"
    value={newRecipe.ingredients}
    onChange={(e) =>
      setNewRecipe({ ...newRecipe, ingredients: e.target.value })
    }
    style={{ marginBottom: '15px', padding: '8px' }}
  />

  <label style={{ marginBottom: '5px' }}>Prep Time (in minutes):</label>
  <input
    type="number"
    placeholder="Prep Time"
    value={newRecipe.prepTime}
    onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
    style={{ marginBottom: '15px', padding: '8px' }}
  />

  <label style={{ marginBottom: '5px' }}>Nutrition Info:</label>
  <input
    type="text"
    placeholder="Nutrition Info"
    value={newRecipe.nutritionInfo}
    onChange={(e) =>
      setNewRecipe({ ...newRecipe, nutritionInfo: e.target.value })
    }
    style={{ marginBottom: '15px', padding: '8px' }}
  />

  <label style={{ marginBottom: '5px' }}>Cuisine Type:</label>
  <input
    type="text"
    placeholder="Cuisine Type (e.g., Italian)"
    value={newRecipe.cuisineType}
    onChange={(e) =>
      setNewRecipe({ ...newRecipe, cuisineType: e.target.value })
    }
    style={{ marginBottom: '15px', padding: '8px' }}
  />

  <label style={{ marginBottom: '5px' }}>Meal Type:</label>
  <input
    type="text"
    placeholder="Meal Type (e.g., Breakfast, Lunch)"
    value={newRecipe.mealType}
    onChange={(e) =>
      setNewRecipe({ ...newRecipe, mealType: e.target.value })
    }
    style={{ marginBottom: '15px', padding: '8px' }}
  />

  <label style={{ marginBottom: '5px' }}>Ratings Average:</label>
  <input
    type="number"
    placeholder="Ratings Average (1-5)"
    value={newRecipe.ratingsAverage}
    onChange={(e) =>
      setNewRecipe({ ...newRecipe, ratingsAverage: e.target.value })
    }
    style={{ marginBottom: '20px', padding: '8px' }}
  />

  <button onClick={handleAddRecipe}>Add Recipe</button>
</div>


      <h3>Recipes</h3>
<table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Ingredients</th>
      <th>Prep Time</th>
      <th>Nutrition Info</th>
      <th>Cuisine Type</th>
      <th>Meal Type</th>
      <th>Ratings Average</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(recipes) && recipes.length > 0 ? (
      recipes.map((recipe) => (
        <tr key={recipe.recipeId}>
          <td>{recipe.recipeId}</td>
          <td>{recipe.title}</td>
          <td>{recipe.description}</td>
          <td>{recipe.ingredients}</td>
          <td>{recipe.prepTime} mins</td>
          <td>{recipe.nutritionInfo}</td>
          <td>{recipe.cuisineType}</td>
          <td>{recipe.mealType}</td>
          <td>{recipe.ratingsAverage}</td>
          <td>
            <button onClick={() => handleOpenRecipeModal(recipe)}>Update</button>
            <button onClick={() => handleDeleteRecipe(recipe.recipeId)}>Delete</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="10">No recipes found</td>
      </tr>
    )}
  </tbody>
</table>
      {/* Render User Modal */}
      {showUserModal && (
        <UpdateUserModal
          user={selectedUser}
          onSave={handleUpdateUser}
          onClose={handleCloseUserModal}
        />
      )}

      {/* Render Recipe Modal */}
      {showRecipeModal && (
        <UpdateRecipeModal
          recipe={selectedRecipe}
          onSave={handleUpdateRecipe}
          onClose={handleCloseRecipeModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
