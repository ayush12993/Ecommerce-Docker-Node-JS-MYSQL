// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
