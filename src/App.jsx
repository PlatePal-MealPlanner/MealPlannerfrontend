import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>  {/* Use Routes instead of Switch */}
        <Route path="/login" element={<Login />} />  {/* Use element instead of component */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />  {/* Default to Login */}
      </Routes>
    </Router>
  );
};

export default App;
