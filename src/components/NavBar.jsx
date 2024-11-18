import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import logoImage from '../assets/platelogo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

 
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FEFF9F',
        padding: '10px 20px',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
     
        <Box component={Link} to="/home" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={logoImage}
            alt="Logo"
            sx={{
              height: '50px', 
              transform: 'scale(2.5)', 
              transformOrigin: 'center', 
              cursor: 'pointer',
            }}
          />
        </Box>

    
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/mealplan"
            variant="contained"
            sx={{
              backgroundColor: '#A0D683',
              color: '#333',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#8DBF6A' },
            }}
          >
            Meal Plan
          </Button>
          <Button
            component={Link}
            to="/shoppinglist"
            variant="contained"
            sx={{
              backgroundColor: '#A0D683',
              color: '#333',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#8DBF6A' },
            }}
          >
            Shopping List
          </Button>
          <Button
            component={Link}
            to="/recipe"
            variant="contained"
            sx={{
              backgroundColor: '#A0D683',
              color: '#333',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#8DBF6A' },
            }}
          >
            Recipe
          </Button>

          {/* Profile Dropdown */}
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              backgroundColor: '#A0D683',
              '&:hover': { backgroundColor: '#8DBF6A' },
              padding: '10px',
            }}
          >
            <AccountCircle sx={{ color: '#333' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              mt: '40px',
            }}
          >
            <MenuItem onClick={() => navigate('/profile')}>View Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;