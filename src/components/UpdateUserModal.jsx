import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';

const UpdateUserModal = ({ user, onSave, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({});

  // Initialize modal with the selected user data
  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (updatedUser.userId) {
      onSave(updatedUser);
    } else {
      console.error('User ID is missing!');
    }
  };

  return (
    <Dialog open={!!user} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update User Profile</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="fname"
                value={updatedUser.fname || ''}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lname"
                value={updatedUser.lname || ''}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            label="Email"
            name="email"
            value={updatedUser.email || ''}
            onChange={handleChange}
            type="email"
            fullWidth
            required
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserModal;
