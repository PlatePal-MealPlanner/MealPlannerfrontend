import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const UpdateUserModal = ({ user, onSave, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedUser);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="fname"
          value={updatedUser.fname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lname"
          value={updatedUser.lname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={updatedUser.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={updatedUser.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserModal;
