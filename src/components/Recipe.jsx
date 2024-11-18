import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@mui/material';
import backgroundImage from '../assets/leafbg.png'; // Background image
import NavBar from '../components/NavBar'; // Reusable NavBar component

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
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

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* NavBar Component */}
      <NavBar />

      {/* Main Content */}
      <Container
        sx={{
          textAlign: 'center',
          paddingTop: '20px',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: '#fff' }}>
          Recipe Collection
        </Typography>

        {/* Recipe Grid */}
        <Grid container spacing={4} justifyContent="center">
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardActionArea component={Link} to={`/recipe/${recipe.id}`}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={recipe.imageURL}
                    alt={recipe.title}
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
    </Box>
  );
};

export default Recipe;
