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

<<<<<<< Updated upstream
  const handleAddToMealPlan = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/mealplan/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId: selectedRecipe.recipeId }),
      });
      alert(`${selectedRecipe.title} added to Meal Plan!`);
      handleClose();
    } catch (error) {
      console.error('Error adding to meal plan:', error);
      alert('Failed to add recipe to Meal Plan.');
    }
  };
=======
  const handleAddToMealPlan = async () => {  
    try {  
        const token = localStorage.getItem('token');  
        if (!token) {  
            alert('You need to log in to add a recipe to the Meal Plan.');  
            return;  
        }  

        const userId = localStorage.getItem('userId');  
        if (!userId) {  
            alert('User ID not found. Please log in again.');  
            return;  
        }  

        // Fetch current meal plans to check for duplicates
        const mealPlanResponse = await fetch(`http://localhost:8080/api/meal-plans/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!mealPlanResponse.ok) {
            throw new Error('Failed to fetch existing meal plans.');
        }

        const currentMealPlans = await mealPlanResponse.json();
        const isDuplicate = currentMealPlans.some(
            (mealPlan) => mealPlan.recipe.recipeId === selectedRecipe.recipeId
        );

        if (isDuplicate) {
            alert('This recipe is already added to the Meal Plan.');
            return;
        }

        // Add the recipe to the meal plan if it's not a duplicate
        const response = await fetch('http://localhost:8080/api/meal-plans/add', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${token}`,  
            },  
            body: JSON.stringify({ userId: Number(userId), recipeId: selectedRecipe.recipeId }),  
        });  

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
  
>>>>>>> Stashed changes

const handleAddToShoppingList = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('You need to log in to add a recipe to the shopping list.');
      return;
    }

    console.log('Adding to shopping list with:', { userId, recipeId: selectedRecipe.recipeId });

    const response = await fetch('http://localhost:8080/api/shopping-list-items/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: Number(userId),
        recipeId: selectedRecipe.recipeId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert(`${selectedRecipe.title} added to Shopping List!`);
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              backgroundColor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
              overflow: "auto",
              maxHeight: "90vh",
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
                <strong>Prep Time:</strong> <br></br> {selectedRecipe.prepTime}
              </Typography>
              <Typography>
                <strong>Nutrition Info:</strong><br></br> {selectedRecipe.nutritionInfo}
              </Typography>
              <Typography>
                <strong>Cuisine Type:</strong><br></br> {selectedRecipe.cuisineType}
              </Typography>
              <Typography>
                <strong>Meal Type:</strong><br></br> {selectedRecipe.mealType}
              </Typography>
              <Typography>
                <strong>Ratings:</strong><br></br> {selectedRecipe.ratingsAverage}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#A0D683',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#8CC765', // Slightly darker shade for hover effect
                  },
                }}
                onClick={handleAddToMealPlan}
              >
                Add to Meal Plan
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#72BF78',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#D3EE98', // Slightly darker shade for hover effect
                  },
                }}
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
