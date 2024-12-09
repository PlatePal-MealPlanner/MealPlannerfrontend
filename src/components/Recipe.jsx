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
import { useLocation, Navigate } from 'react-router-dom';

const Recipe = () => {
  const location = useLocation(); // Hook to get current location
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // For modal
  const [open, setOpen] = useState(false); // Modal state

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId'); // Get userId from the URL params

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

  // Check if the user is logged in
  const token = localStorage.getItem('token');
  if (!token || !userId) {
    return <Navigate to="/login" replace />;
  }

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
      const token = localStorage.getItem("token"); // Retrieve the auth token
      const userId = localStorage.getItem("userId"); // Retrieve the user ID (from login or storage)
  
      if (!token || !userId) {
        alert("You need to log in to add a recipe to the Meal Plan.");
        return;
      }
  
      // Fetch the current meal plans for the user
      const mealPlanResponse = await fetch(
        `http://localhost:8080/api/meal-plans/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      let mealPlans = [];
  
      if (mealPlanResponse.status === 200) {
        mealPlans = await mealPlanResponse.json(); // parse the meal plans if status is OK
      } else if (mealPlanResponse.status === 204) {
        // No content, meaning the user has no meal plans
        mealPlans = [];
      } else {
        // Any other error status
        throw new Error("Failed to fetch existing meal plans.");
      }
  
      // Check if the selected recipe is already in the user's meal plan
      const isDuplicate = mealPlans.some(
        (mealPlan) =>
          mealPlan.recipe && mealPlan.recipe.recipeId === selectedRecipe.recipeId
      );
  
      if (isDuplicate) {
        alert("This recipe is already added to the Meal Plan.");
        return;
      }
  
      // Prepare request body
      const body = {
        userId: Number(userId), // Ensure it's a number
        recipeId: selectedRecipe.recipeId,
      };
  
      // Call the backend API to add the recipe to the meal plan
      const response = await fetch("http://localhost:8080/api/meal-plans/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
        body: JSON.stringify(body),
      });
  
      // Handle API response
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      alert(`${selectedRecipe.title} added to Meal Plan!`);
      handleClose(); // Close the modal after successful addition
    } catch (error) {
      console.error("Error adding to meal plan:", error);
      alert(error.message || "Failed to add recipe to Meal Plan. Please try again.");
    }
  };


  const handleAddToShoppingList = async () => {
    try {
      const token = localStorage.getItem('token');
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
    backgroundSize: 'cover', // Ensures the image covers the entire container
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    backgroundPosition: 'center', // Centers the image
    minHeight: '100vh', // Minimum height to cover the viewport
    width: '100%',
    overflow: 'auto', // Ensures scrolling works properly if content overflows
    backgroundAttachment: 'fixed', // Keeps the background fixed while scrolling
    paddingBottom: '20px',
    display: 'flex', // Allows centering of content
    flexDirection: 'column', // Stacks child elements vertically
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
              width: '50%',
              backgroundColor: 'white',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
              overflow: 'auto',
              maxHeight: '90vh',
            }}
          >
            {/* Modal content */}
            <Box display="flex" flexDirection="row" gap="20px">
              <img
                src={`http://localhost:8080/api/recipe/images/${selectedRecipe.imagePath}`}
                alt={selectedRecipe.title}
                style={{
                  borderRadius: '10px',
                  width: '40%',
                  objectFit: 'cover',
                }}
              />
              <Box sx={{ width: '60%', textAlign: 'left' }}>
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

            <Typography variant="h6" sx={{ mt: 3, textAlign: 'left' }}>
              <strong>Description:</strong> <br />
              {selectedRecipe.description}
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', gap: 3 }}>
              <Typography>
                <strong>Prep Time:</strong> <br />
                {selectedRecipe.prepTime}
              </Typography>
              <Typography>
                <strong>Nutrition Info:</strong>
                <br />
                {selectedRecipe.nutritionInfo}
              </Typography>
              <Typography>
                <strong>Cuisine Type:</strong>
                <br />
                {selectedRecipe.cuisineType}
              </Typography>
              <Typography>
                <strong>Meal Type:</strong>
                <br />
                {selectedRecipe.mealType}
              </Typography>
              <Typography>
                <strong>Ratings:</strong>
                <br />
                {selectedRecipe.ratingsAverage}
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
