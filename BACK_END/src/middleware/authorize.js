const jwt = require('jsonwebtoken');
const User = require('../Models/users.model'); // Adjust the path as needed

// Middleware to check for admin role
const isAdmin = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
    if (!token) return res.status(401).json({ message: 'Access denied.' });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret

    // Find user by userId
    const user = await User.findOne({ userId: decoded.userId });

    // Check if user exists and has 'Admin' role
    if (!user || user.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    // Optionally attach the user to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error); // Debugging line
    res.status(500).json({ message: 'Server error.', error });
  }
};

// Middleware to check for user role
const isUser = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
    if (!token) return res.status(401).json({ message: 'Access denied.' });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret

    // Find user by userId
    const user = await User.findOne({ userId: decoded.userId });

    // Check if user exists and has 'User' role
    if (!user || user.role !== 'User') {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    // Optionally attach the user to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in isUser middleware:', error); // Debugging line
    res.status(500).json({ message: 'Server error.', error });
  }
};

module.exports = {
  isAdmin,
  isUser
};
