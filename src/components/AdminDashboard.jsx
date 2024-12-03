import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateUserModal from './UpdateUserModal';
import UpdateRecipeModal from './UpdateRecipeModal';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminDashboard = () => {
  const [data, setData] = useState([]); // Users data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // Fetch users and recipes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [userResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setData(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update User
  const handleUpdateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/users/${updatedUser.userId}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData((prevData) =>
        prevData.map((user) =>
          user.userId === updatedUser.userId ? response.data : user
        )
      );

      handleCloseUserModal();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user.');
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevData) => prevData.filter((user) => user.userId !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    }
  };



  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => handleNavigation('/admin-recipes')}>
            Recipes
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/meal-plans')}>
            Meal Plans
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/shopping-list')}>
            Shopping List
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* User Table */}
      <TableContainer component={Paper} sx={{ margin: '20px auto', maxWidth: '80%' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
          User Management
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.fname}</TableCell>
                <TableCell>{user.lname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenUserModal(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.userId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     

      {/* Modals */}
      {showUserModal && (
        <UpdateUserModal
          user={selectedUser}
          onSave={handleUpdateUser}
          onClose={handleCloseUserModal}
        />
      )}

    </div>
  );
};

export default AdminDashboard;
