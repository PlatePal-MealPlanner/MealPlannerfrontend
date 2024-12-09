import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import NavBar from '../components/NavBar'; 
import backgroundImage from '../assets/leafbg.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');

  // Fetch dishes from the backend
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDishes();
  }, []);

  // Open the dialog and set the selected dish
  const handleCardClick = (dish) => {
    setSelectedDish(dish);
    setDialogOpen(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDish(null);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        overflowY: 'auto',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* NavBar Component - Fixed Position */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <NavBar />
      </Box>

      {/* Main Content */}
      <Container sx={{ textAlign: 'center', paddingTop: '20px', pb: '20px', flex: '1' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
          Welcome to Our Recipe Platform
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '600px',
            margin: '0 auto',
            mb: 4,
            fontSize: '1.2rem',
          }}
        >
          Explore our collection of delicious dishes. Click on any dish to view the full recipe.
        </Typography>

        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          // Dishes Grid
          <Grid container spacing={4} justifyContent="center">
            {dishes.map((dish) => (
              <Grid item xs={12} sm={6} md={4} key={dish.id}>
                <Card
                  sx={{
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                  onClick={() => handleCardClick(dish)} // Open dialog on card click
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={dish.image}
                      alt={dish.title}
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
                        {dish.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Dish Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{selectedDish?.title}</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <img
                src={selectedDish?.image}
                alt={selectedDish?.title}
                style={{ width: '100%', borderRadius: '10px' }}
              />
            </Box>
            <Typography variant="h6">Ingredients:</Typography>
            <Typography>{selectedDish?.ingredients || 'Ingredients not available'}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Description:
            </Typography>
            <Typography>{selectedDish?.description || 'Description not available'}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              onClick={() => console.log('Add to Meal Plan:', selectedDish)}
            >
              Add to Meal Plan
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => console.log('Add to Shopping List:', selectedDish)}
            >
              Add to Shopping List
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Home;
