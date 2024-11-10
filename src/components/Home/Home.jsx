import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import NavBar from '../NavBar/NavBar';

const recipes = [
    { title: 'Quick-Cooking Oats', image: 'path/to/oats.jpg' },
    { title: 'Green Goddess Farro Bowl', image: 'path/to/farro_bowl.jpg' },
    { title: 'Cabbage Roll Casserole', image: 'path/to/cabbage_roll.jpg' },
    { title: 'Salmon & Quinoa Bowls with Green Beans, Olives & Feta', image: 'path/to/salmon_quinoa.jpg' },
    { title: 'Carrot Cake Baked Oatmeal', image: 'path/to/carrot_cake.jpg' },
    { title: 'Crispy Baked Catfish', image: 'path/to/catfish.jpg' }
];

const MealPlanPage = () => {
    return (
        <div style={{ backgroundImage: 'url(/BG.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <NavBar />
            <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {recipes.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={{ borderRadius: '15px' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={recipe.image}
                                    alt={recipe.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" align="center" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                                        {recipe.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default MealPlanPage;
