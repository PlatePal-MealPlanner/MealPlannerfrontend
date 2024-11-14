// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'; // Your Home component
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'; // Protected Route component
import MealPlan from './components/MealPlan';
import Recipe from './components/Recipe';
import ShoppingList from './components/ShoppingList';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route, when the app loads, redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Route - Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route - Home */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/mealplan" 
          element={
            <ProtectedRoute>
              <MealPlan />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/recipe" 
          element={
            <ProtectedRoute>
              <Recipe />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/shoppinglist" 
          element={
            <ProtectedRoute>
              <ShoppingList />
            </ProtectedRoute>
          }
        />

        {/* Catch all other routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
