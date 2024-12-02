import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateUserModal from './UpdateUserModal';
import UpdateRecipeModal from './UpdateRecipeModal';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminDashboard = () => {
  const [data, setData] = useState([]); // Users data
  const [recipes, setRecipes] = useState([]); // Recipes data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
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
  const navigate = useNavigate();

  // Fetch users and recipes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [userResponse, recipeResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8080/api/recipe/allrecipe', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setData(userResponse.data);
        setRecipes(recipeResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update User
  const handleUpdateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/users/${updatedUser.userId}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData((prevData) =>
        prevData.map((user) =>
          user.userId === updatedUser.userId ? response.data : user
        )
      );

      handleCloseUserModal();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user.');
    }
  };

  // Update Recipe
  const handleUpdateRecipe = async (updatedRecipe) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/recipe/update/${updatedRecipe.recipeId}`,
        updatedRecipe,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.recipeId === updatedRecipe.recipeId ? response.data : recipe
        )
      );

      handleCloseRecipeModal();
    } catch (err) {
      console.error('Error updating recipe:', err);
      setError('Failed to update recipe.');
    }
  };

  // Add New Recipe
  const handleAddRecipe = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/recipe/addrecipe',
        newRecipe,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecipes([...recipes, response.data]);
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
    } catch (err) {
      console.error('Error adding recipe:', err);
      setError('Failed to add recipe.');
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevData) => prevData.filter((user) => user.userId !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    }
  };

  // Delete Recipe
  const handleDeleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/recipe/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.recipeId !== id)
      );
    } catch (err) {
      console.error('Error deleting recipe:', err);
      setError('Failed to delete recipe.');
    }
  };

  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleOpenRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedRecipe(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => handleNavigation('/recipes')}>
            Recipes
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/meal-plans')}>
            Meal Plans
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/shopping-list')}>
            Shopping List
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* User Table */}
      <TableContainer component={Paper} sx={{ margin: '20px auto', maxWidth: '80%' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
          User Management
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.fname}</TableCell>
                <TableCell>{user.lname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenUserModal(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.userId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recipe Table */}
      <TableContainer component={Paper} sx={{ margin: '20px auto', maxWidth: '80%' }}>
  <Typography variant="h5" sx={{ marginBottom: '10px' }}>
    Recipe Management
  </Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell><strong>ID</strong></TableCell>
        <TableCell><strong>Title</strong></TableCell>
        <TableCell><strong>Description</strong></TableCell>
        <TableCell><strong>Ingredients</strong></TableCell>
        <TableCell><strong>Prep Time (mins)</strong></TableCell>
        <TableCell><strong>Nutrition Info</strong></TableCell>
        <TableCell><strong>Cuisine Type</strong></TableCell>
        <TableCell><strong>Meal Type</strong></TableCell>
        <TableCell><strong>Ratings Average</strong></TableCell>
        <TableCell align="right"><strong>Actions</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <TableRow key={recipe.recipeId}>
            <TableCell>{recipe.recipeId}</TableCell>
            <TableCell>{recipe.title}</TableCell>
            <TableCell>{recipe.description}</TableCell>
            <TableCell>{recipe.ingredients}</TableCell>
            <TableCell>{recipe.prepTime}</TableCell>
            <TableCell>{recipe.nutritionInfo}</TableCell>
            <TableCell>{recipe.cuisineType}</TableCell>
            <TableCell>{recipe.mealType}</TableCell>
            <TableCell>{recipe.ratingsAverage}</TableCell>
            <TableCell align="right">
              <IconButton color="primary" onClick={() => handleOpenRecipeModal(recipe)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={10} align="center">
            No recipes found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>


      {/* Add Recipe */}
      <Box sx={{ maxWidth: '80%', margin: '20px auto' }}>
  <Typography variant="h6" sx={{ marginBottom: '10px' }}>
    Add New Recipe
  </Typography>
  <TextField
    label="Title"
    fullWidth
    margin="normal"
    value={newRecipe.title}
    onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
    placeholder="Enter recipe title"
  />
  <TextField
    label="Description"
    fullWidth
    multiline
    rows={4}
    margin="normal"
    value={newRecipe.description}
    onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
    placeholder="Enter a brief description"
  />
  <TextField
    label="Ingredients"
    fullWidth
    multiline
    rows={2}
    margin="normal"
    value={newRecipe.ingredients}
    onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
    placeholder="List ingredients (comma-separated)"
  />
  <TextField
    label="Preparation Time (minutes)"
    type="number"
    fullWidth
    margin="normal"
    value={newRecipe.prepTime}
    onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
    placeholder="Enter preparation time"
  />
  <TextField
    label="Nutrition Information"
    fullWidth
    margin="normal"
    value={newRecipe.nutritionInfo}
    onChange={(e) => setNewRecipe({ ...newRecipe, nutritionInfo: e.target.value })}
    placeholder="Provide nutritional details"
  />
  <TextField
    label="Cuisine Type"
    fullWidth
    margin="normal"
    value={newRecipe.cuisineType}
    onChange={(e) => setNewRecipe({ ...newRecipe, cuisineType: e.target.value })}
    placeholder="E.g., Italian, Asian, Mexican"
  />
  <TextField
    label="Meal Type"
    fullWidth
    margin="normal"
    value={newRecipe.mealType}
    onChange={(e) => setNewRecipe({ ...newRecipe, mealType: e.target.value })}
    placeholder="E.g., Breakfast, Lunch, Dinner"
  />
  <TextField
    label="Ratings Average (1-5)"
    type="number"
    fullWidth
    margin="normal"
    value={newRecipe.ratingsAverage}
    onChange={(e) => setNewRecipe({ ...newRecipe, ratingsAverage: e.target.value })}
    placeholder="Enter average rating"
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleAddRecipe}
    sx={{ marginTop: '10px' }}
  >
    Add Recipe
  </Button>
</Box>


      {/* Modals */}
      {showUserModal && (
        <UpdateUserModal
          user={selectedUser}
          onSave={handleUpdateUser}
          onClose={handleCloseUserModal}
        />
      )}

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
