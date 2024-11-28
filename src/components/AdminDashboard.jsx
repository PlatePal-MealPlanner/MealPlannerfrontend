import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [data, setData] = useState([]); // State to store data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error state

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage

      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/v1/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });

        setData(response.data); // Set data from response
        setLoading(false); // Stop loading
      } catch (err) {
        console.error('Error fetching data:', err);
        const message =
          err.response?.data?.message || 'Failed to fetch data from the server.';
        setError(message); // Set detailed error message
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error)
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    ); // Show error message if fetching fails

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
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.userId}</td>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
