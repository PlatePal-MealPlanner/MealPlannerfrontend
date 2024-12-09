import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Modal,
  Button,
} from '@mui/material';
import backgroundImage from '../assets/leafbg.png';
import NavBar from '../components/NavBar';

import cabbageRollImage from '../assets/Recipes/Cabbage Roll Casserole.png';
import carrotCakeOatmealImage from '../assets/Recipes/Carrot Cake Based Oatmeal.png';
import bakedCatfishImage from '../assets/Recipes/Crispy Baked Catfish.png';
import farroBowlImage from '../assets/Recipes/Green Goddess Farro Bowl.png';
import kaleQuinoaSaladImage from '../assets/Recipes/Kale & Quinoa Salad with Lemon Dressing.png';
import oatsImage from '../assets/Recipes/Quick-Cooking Oats.png';
import salmonQuinoaBowlImage from "../assets/Recipes/Salmon_Quinoa_Bowls.png";
import beanSoupImage from '../assets/Recipes/Slow-Cooker Bean, Kale & Barley Soup.png';
import teriyakiRiceBowlImage from '../assets/Recipes/Teriyaki Chicken Rice Bowl.png';
import stuffedCabbageImage from '../assets/Recipes/Vegetarian Stuffed Cabbage.png';

const ShoppingList = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const shoppingItems = [
    { name: 'Cabbage Roll Casserole', image: cabbageRollImage },
    { name: 'Carrot Cake Oatmeal', image: carrotCakeOatmealImage },
    { name: 'Crispy Baked Catfish', image: bakedCatfishImage },
    { name: 'Green Goddess Farro Bowl', image: farroBowlImage },
    { name: 'Kale & Quinoa Salad', image: kaleQuinoaSaladImage },
    { name: 'Quick-Cooking Oats', image: oatsImage },
    { name: 'Salmon & Quinoa Bowl', image: salmonQuinoaBowlImage },
    { name: 'Bean, Kale & Barley Soup', image: beanSoupImage },
    { name: 'Teriyaki Chicken Rice Bowl', image: teriyakiRiceBowlImage },
    { name: 'Vegetarian Stuffed Cabbage', image: stuffedCabbageImage },
  ];

  const ingredients = [
    'Chicken Breast',
    'Garlic',
    'Onion',
    'Tomatoes',
    'Basil',
    'Spinach',
    'Lentils',
    'Chickpeas',
    'Sweet Potato',
    'Rice',
    'Quinoa',
    'Bell Peppers',
    'Cucumber',
    'Carrots',
    'Parsley',
    'Olive Oil',
  ];

  const handleOpen = (item) => {
    setSelectedItem({
      ...item,
      ingredients: Array.from({ length: 5 }, () =>
        ingredients[Math.floor(Math.random() * ingredients.length)]
      ).map((ingredient) => ({ name: ingredient, checked: false })),
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const toggleIngredient = (index) => {
    setSelectedItem((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, checked: !ingredient.checked } : ingredient
      ),
    }));
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
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
            mb: 3,
            color: '#fff',
          }}
        >
          Shopping List
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {shoppingItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: '15px',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardActionArea onClick={() => handleOpen(item)}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={item.image}
                    alt={item.name}
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
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedItem && (
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
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
            >
              {selectedItem.name}
            </Typography>
            <ul>
              {selectedItem.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={ingredient.checked}
                      onChange={() => toggleIngredient(index)}
                      style={{ marginRight: '8px' }}
                    />
                    <span
                      style={{
                        textDecoration: ingredient.checked ? 'line-through' : 'none',
                      }}
                    >
                      {ingredient.name}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: '#72BF78',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#5BAF60',
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default ShoppingList;
