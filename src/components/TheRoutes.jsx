
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home'; // Your Home component
import Register from './Register';
import ProtectedRoute from './ProtectedRoute'; // Protected Route component
import MealPlan from './MealPlan';
import Recipe from './Recipe';
import ShoppingList from './ShoppingList';


export default function TheRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/Register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
            <Route path="/MealPlan" element={<ProtectedRoute><MealPlan /></ProtectedRoute>} />
            <Route path="/Recipe" element={<ProtectedRoute><Recipe /></ProtectedRoute>} />
            <Route path="/ShoppingList" element={<ProtectedRoute><ShoppingList /></ProtectedRoute>} />
            <Route path="*" element={<h1>Nothing Here..</h1>} />
        </Routes>
    )
}
