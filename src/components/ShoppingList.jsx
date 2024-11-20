import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import backgroundImage from '../assets/leafbg.png'; // Background image
import NavBar from '../components/NavBar'; // Import the NavBar

const ShoppingList = () => {
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
      {/* NavBar Component */}
      <NavBar />

      {/* Main Content */}
      <Container
        sx={{
          textAlign: 'center',
          paddingTop: '20px',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Shopping List
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
          Here is your shopping list, generated from your selected meals and recipes.
        </Typography>

        {/* Shopping List Items */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: '#ff7043',
            fontSize: '1.8rem',
            marginBottom: '20px',
          }}
        >
          Your Shopping List
        </Typography>
        <List sx={{ maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
          {['Oats', 'Chicken Breast', 'Farro', 'Tomato Sauce', 'Vegetables', 'Salmon'].map(
            (item, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: '#ffe0b2',
                  marginBottom: '8px',
                  borderRadius: '4px',
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            )
          )}
        </List>
      </Container>
    </Box>
  );
};

export default ShoppingList;
