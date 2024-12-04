import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  AppBar,
  Toolbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    prepTime: "",
    nutritionInfo: "",
    cuisineType: "",
    mealType: "",
    ratingsAverage: "",
  });
  const [updatedRecipe, setUpdatedRecipe] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/recipe/allrecipe", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", newRecipe.title);
      formData.append("description", newRecipe.description);
      formData.append("ingredients", newRecipe.ingredients);
      formData.append("prepTime", newRecipe.prepTime);
      formData.append("nutritionInfo", newRecipe.nutritionInfo);
      formData.append("cuisineType", newRecipe.cuisineType);
      formData.append("mealType", newRecipe.mealType);
      formData.append("ratingsAverage", newRecipe.ratingsAverage);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post("http://localhost:8080/api/recipe/addrecipe", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setRecipes([...recipes, response.data]);
      alert("Recipe added successfully!");
      setOpenAdd(false);
      setNewRecipe({});
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe.");
    }
  };

  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setUpdatedRecipe(recipe);
    setOpenEdit(true);
  };

  const handleUpdateRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", updatedRecipe.title);
      formData.append("description", updatedRecipe.description);
      formData.append("ingredients", updatedRecipe.ingredients);
      formData.append("prepTime", updatedRecipe.prepTime);
      formData.append("nutritionInfo", updatedRecipe.nutritionInfo);
      formData.append("cuisineType", updatedRecipe.cuisineType);
      formData.append("mealType", updatedRecipe.mealType);
      formData.append("ratingsAverage", updatedRecipe.ratingsAverage);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.put(
        `http://localhost:8080/api/recipe/update/${selectedRecipe.recipeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Recipe updated successfully!");
      setOpenEdit(false);
      setSelectedImage(null);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.recipeId === selectedRecipe.recipeId
            ? { ...updatedRecipe, imagePath: recipe.imagePath }
            : recipe
        )
      );
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe.");
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/recipe/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.recipeId !== id));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please select a valid image file (e.g., .jpg, .png, .jpeg).");
      event.target.value = null; // Reset the file input
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Recipe Management
          </Typography>
          <Button color="inherit" onClick={() => navigate("/admin-dashboard")}>
            Admin Dashboard
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Recipe Management
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginBottom: "20px" }} onClick={() => setOpenAdd(true)}>
          Add New Recipe
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Ingredients</strong></TableCell>
                <TableCell><strong>Prep Time</strong></TableCell>
                <TableCell><strong>Cuisine Type</strong></TableCell>
                <TableCell><strong>Meal Type</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.recipeId}>
                  <TableCell>{recipe.recipeId}</TableCell>
                  <TableCell>{recipe.title}</TableCell>
                  <TableCell>{recipe.description}</TableCell>
                  <TableCell>{recipe.ingredients}</TableCell>
                  <TableCell>{recipe.prepTime} mins</TableCell>
                  <TableCell>{recipe.cuisineType}</TableCell>
                  <TableCell>{recipe.mealType}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(recipe)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Recipe Modal */}
        <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
          <DialogTitle>Add New Recipe</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={newRecipe.description}
              onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
            />
            <TextField
              label="Ingredients"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            />
            <TextField
              label="Prep Time"
              type="number"
              fullWidth
              margin="normal"
              value={newRecipe.prepTime}
              onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
            />
            <TextField
              label="Nutrition Info"
              fullWidth
              margin="normal"
              value={newRecipe.nutritionInfo}
              onChange={(e) => setNewRecipe({ ...newRecipe, nutritionInfo: e.target.value })}
            />
            <TextField
              label="Cuisine Type"
              fullWidth
              margin="normal"
              value={newRecipe.cuisineType}
              onChange={(e) => setNewRecipe({ ...newRecipe, cuisineType: e.target.value })}
            />
            <TextField
              label="Meal Type"
              fullWidth
              margin="normal"
              value={newRecipe.mealType}
              onChange={(e) => setNewRecipe({ ...newRecipe, mealType: e.target.value })}
            />
            <TextField
              label="Ratings Average"
              type="number"
              fullWidth
              margin="normal"
              value={newRecipe.ratingsAverage}
              onChange={(e) => setNewRecipe({ ...newRecipe, ratingsAverage: e.target.value })}
            />
            <Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            sx={{ marginTop: "10px" }} 
            />
            <Typography variant="body2" sx={{ marginTop: "5px", color: "#666" }}>
            Upload Image for Recipe
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button onClick={handleAddRecipe} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Recipe Modal */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Update Recipe</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={updatedRecipe.title}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={updatedRecipe.description}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, description: e.target.value })}
            />
            <TextField
              label="Ingredients"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              value={updatedRecipe.ingredients}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })}
            />
            <TextField
              label="Prep Time"
              type="number"
              fullWidth
              margin="normal"
              value={updatedRecipe.prepTime}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, prepTime: e.target.value })}
            />
            <TextField
              label="Nutrition Info"
              fullWidth
              margin="normal"
              value={updatedRecipe.nutritionInfo}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, nutritionInfo: e.target.value })}
            />
            <TextField
              label="Cuisine Type"
              fullWidth
              margin="normal"
              value={updatedRecipe.cuisineType}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, cuisineType: e.target.value })}
            />
            <TextField
              label="Meal Type"
              fullWidth
              margin="normal"
              value={updatedRecipe.mealType}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, mealType: e.target.value })}
            />
            <TextField
              label="Ratings Average"
              type="number"
              fullWidth
              margin="normal"
              value={updatedRecipe.ratingsAverage}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ratingsAverage: e.target.value })}
            />
            <Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            sx={{ marginTop: "10px" }} 
            />
            <Typography variant="body2" sx={{ marginTop: "5px", color: "#666" }}>
            Update Image for Recipe
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={handleUpdateRecipe} color="primary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminRecipeManagement;
