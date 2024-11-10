import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#F7EAAE' }}>
            <Toolbar>
                <img src="/LOGO.png" alt="PlatePal Logo" style={{ height: '40px', marginRight: '10px' }} />
                <div style={{ display: 'flex', marginLeft: 'auto' }}>
                    <Button color="inherit" style={{ color: '#fff',  fontFamily: 'cursive', marginLeft: '10px', backgroundColor: '#72BF78',width: '160px', border: '2px solid #72BF78', borderRadius: '20px' }}>Home</Button>
                    <Button color="inherit" style={{ color: '#fff',  fontFamily: 'cursive', marginLeft: '10px', backgroundColor: '#72BF78',width: '160px', border: '2px solid #72BF78', borderRadius: '20px' }}>Meal Plan</Button>
                    <Button color="inherit" style={{ color: '#fff',  fontFamily: 'cursive', marginLeft: '10px', backgroundColor: '#72BF78',width: '160px', border: '2px solid #72BF78', borderRadius: '20px' }}>Shopping List</Button>
                    <Button color="inherit" style={{ color: '#fff',  fontFamily: 'cursive', marginLeft: '10px',marginRight: '200px', backgroundColor: '#72BF78',width: '160px', border: '2px solid #72BF78', borderRadius: '20px' }}>About Us</Button>
                    <IconButton edge="end" color="inherit" style={{ marginLeft: '10px' }}>
                        <AccountCircle style={{ color: '#6E9941' }} />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
