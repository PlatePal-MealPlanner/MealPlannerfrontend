
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home'; // Your Home component
import Register from './Register';
import ProtectedRoute from './ProtectedRoute'; // Protected Route component
import MealPlan from './MealPlan';
import Recipe from './Recipe';
import ShoppingList from './ShoppingList';
import UserProfile from './UserProfile';
import AdminDashboard from './AdminDashboard';
import AdminRecipeManagement from './AdminRecipeManagement';


export default function TheRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/MealPlan" element={<ProtectedRoute><MealPlan /></ProtectedRoute>} />
            <Route path="/Recipe" element={<ProtectedRoute><Recipe /></ProtectedRoute>} />
            <Route path="/ShoppingList" element={<ProtectedRoute><ShoppingList /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/AdminRecipeManagement" element={<ProtectedRoute><AdminRecipeManagement /></ProtectedRoute>} />
            <Route path="*" element={<h1>Nothing Here..</h1>} />
        </Routes>
    )
}
