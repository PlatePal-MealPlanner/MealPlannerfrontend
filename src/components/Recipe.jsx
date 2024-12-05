import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Modal,
  Button,
} from '@mui/material';
import NavBar from '../components/NavBar'; // NavBar component
import backgroundImage from '../assets/leafbg.png'; // Background image

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // For modal
  const [open, setOpen] = useState(false); // Modal state

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token for authentication
        const response = await fetch('http://localhost:8080/api/recipe/allrecipe', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  const handleAddToMealPlan = async () => {  
    try {  
        const token = localStorage.getItem('token');  
        if (!token) {  
            alert('You need to log in to add a recipe to the Meal Plan.');  
            return;  
        }  

        console.log("Token:", token);  

        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage  
        console.log("User ID:", userId); // Log the userId to check its value  

        const response = await fetch('http://localhost:8080/api/meal-plans/add', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${token}`,  
            },  
            body: JSON.stringify({ userId: userId ? Number(userId) : null, recipeId: selectedRecipe.recipeId }),  
        });  

        console.log("Response:", response);  

        if (!response.ok) {  
            if (response.status === 403) {  
                throw new Error('You do not have permission to perform this action.');  
            }  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  

        alert(`${selectedRecipe.title} added to Meal Plan!`);  
        handleClose();  

        if (typeof fetchMealPlans === 'function') {  
            fetchMealPlans();  
        }  
    } catch (error) {  
        console.error('Error adding to meal plan:', error);  
        alert(error.message || 'Failed to add recipe to Meal Plan.');  
    }  
  };
  

  const handleAddToShoppingList = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/shoppinglist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId: selectedRecipe.recipeId }),
      });
      alert(`${selectedRecipe.title} added to Shopping List!`);
      handleClose();
    } catch (error) {
      console.error('Error adding to shopping list:', error);
      alert('Failed to add recipe to Shopping List.');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh-100px)',
        width: '100%',
        overflow: 'auto', // Ensure scrolling works properly
        backgroundAttachment: 'fixed', // Keep the background fixed while scrolling
        paddingBottom: '20px',
        color: '#333',
      }}
    >
      <NavBar />

      <Container
        sx={{
          textAlign: 'center',
          paddingTop: '20px',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#fff',
          }}
        >
          Recipe Collection
        </Typography>

        {/* Recipe Grid */}
        <Grid container spacing={4} justifyContent="center">
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.recipeId}>
              <Card
                sx={{
                  borderRadius: '15px',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardActionArea onClick={() => handleOpen(recipe)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:8080/api/recipe/images/${recipe.imagePath}`} // Include "uploads/"
                    alt={recipe.title}
                    sx={{
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {recipe.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              backgroundColor: 'white',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
            }}
          >
            <Box display="flex" flexDirection="row" gap="20px">
              <img
                src={`http://localhost:8080/api/recipe/images/${selectedRecipe.imagePath}`} // Fetch image from backend
                alt={selectedRecipe.title}
                style={{
                  borderRadius: '10px',
                  width: '40%',
                  objectFit: 'cover',
                }}
              />
              <Box sx={{ width: '60%' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {selectedRecipe.title}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  <strong>Ingredients:</strong>
                </Typography>
                <ul>
                  {selectedRecipe.ingredients.split(',').map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }}>
              <strong>Description:</strong> {selectedRecipe.description}
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', gap: 3 }}>
              <Typography>
                <strong>Prep Time:</strong> {selectedRecipe.prepTime}
              </Typography>
              <Typography>
                <strong>Nutrition Info:</strong> {selectedRecipe.nutritionInfo}
              </Typography>
              <Typography>
                <strong>Cuisine Type:</strong> {selectedRecipe.cuisineType}
              </Typography>
              <Typography>
                <strong>Meal Type:</strong> {selectedRecipe.mealType}
              </Typography>
              <Typography>
                <strong>Ratings:</strong> {selectedRecipe.ratingsAverage}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToMealPlan}
              >
                Add to Meal Plan
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddToShoppingList}
              >
                Add to Shopping List
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Recipe;
