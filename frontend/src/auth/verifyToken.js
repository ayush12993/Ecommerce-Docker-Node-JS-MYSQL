import jwt from 'jsonwebtoken';

const verifyToken = () => {
  // Retrieve the token from local storage or wherever it's stored
  const token = localStorage.getItem('token');

  if (!token) {
    // Token not found, handle unauthorized access
    // For example, redirect to the login page
    window.location.href = '/login';
    return;
  }

  jwt.verify(token, 'st39NWy9sa45Xgf2', (err, decoded) => {
    if (err) {
      // Invalid token, handle unauthorized access
      // For example, redirect to the login page
      window.location.href = '/login';
      return;
    }

    // Token is valid, access allowed
    console.log(decoded);

    // Check if the user has the admin role
    if (decoded.userRole !== 'ADMIN') {
      // User does not have admin role, handle access denied
      // For example, display an error message or redirect to a restricted page
      console.error('Access denied. You must have admin privileges to add a product.');
      return;
    }

    // User has admin role, proceed with whatever action is needed
    console.log('Admin user detected. Proceed with action.');
  });
};

export default verifyToken;