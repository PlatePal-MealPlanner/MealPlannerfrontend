import React, { useState } from 'react';

const UpdateUserModal = ({ user, onSave, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(updatedUser); // Trigger the save callback
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        zIndex: 1000,
      }}
    >
      <h2>Update User</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="fName"
            value={updatedUser.fName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lName"
            value={updatedUser.lName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={updatedUser.role}
            onChange={handleInputChange}
          >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="button" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserModal;
