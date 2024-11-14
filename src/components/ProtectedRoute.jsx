import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated by checking the presence of a token in localStorage
  const token = localStorage.getItem('token');

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (the component that is being protected)
  return children;
};

export default ProtectedRoute;