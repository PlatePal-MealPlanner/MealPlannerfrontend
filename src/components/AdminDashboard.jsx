import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserModal from './UpdateUserModal'; // Import the UpdateUserModal component

const AdminDashboard = () => {
  const [data, setData] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // Currently selected user for update

  // Fetch users from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get(
          'http://localhost:8080/api/v1/admin/users', // Adjust the URL based on your backend
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch users.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((user) => user.userId !== id)); // Remove user from the state
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    }
  };

  // Open modal for updating a user
  const handleOpenModal = (user) => {
    console.log('Opening modal with user:', user); // Debugging: check if userId exists here
    setSelectedUser(user); // Set the user to update
    setShowModal(true); // Show the modal
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
    setSelectedUser(null); // Clear the selected user
  };

  // Handle user update from the modal
  const handleUpdate = async (updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/users/${updatedUser.userId}`, // Ensure userId is passed in the URL
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedData = data.map((user) =>
        user.userId === updatedUser.userId ? response.data : user
      );
      setData(updatedData); // Update the user in the UI
      handleCloseModal(); // Close the modal
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.userId}>
              <td>{item.userId}</td>
              <td>{item.fname}</td>
              <td>{item.lname}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <button onClick={() => handleOpenModal(item)}>Update</button>
                <button onClick={() => handleDelete(item.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render UpdateUserModal if showModal is true */}
      {showModal && (
        <UpdateUserModal
          user={selectedUser}
          onSave={handleUpdate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
