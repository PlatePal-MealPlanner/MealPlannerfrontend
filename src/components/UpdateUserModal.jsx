import React, { useState, useEffect } from 'react';

const UpdateUserModal = ({ user, onSave, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({});

  // Initialize the modal with the selected user data
  useEffect(() => {
    if (user) {
      console.log('Modal data:', user); // Debugging: check if user data is passed correctly
      setUpdatedUser(user); // Initialize the form with current user data
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
      onSave(updatedUser); // Pass updated user data to parent component
    } else {
      console.error('User ID is missing!');
    }
  };

  return (
    <div className="modal">
      <h2>Update User</h2>
      <form>
        <label>First Name:</label>
        <input
          type="text"
          name="fname"
          value={updatedUser.fname || ''}
          onChange={handleChange}
        />
        <br />
        <label>Last Name:</label>
        <input
          type="text"
          name="lname"
          value={updatedUser.lname || ''}
          onChange={handleChange}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={updatedUser.email || ''}
          onChange={handleChange}
        />
        <br />
        <label>Role:</label>
        <select
          name="role"
          value={updatedUser.role || ''}
          onChange={handleChange}
        >
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
        <br />
        <button type="button" onClick={handleSubmit}>Save</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default UpdateUserModal;
