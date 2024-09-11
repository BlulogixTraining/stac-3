const jwt = require('jsonwebtoken');
const User = require('../Models/users.model'); // Adjust the path as needed

// Middleware to check for admin role
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
    if (!token) return res.status(401).json({ message: 'Access denied.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    req.user = user; // Optionally attach the user to the request
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

// Middleware to check for user role
const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
    if (!token) return res.status(401).json({ message: 'Access denied.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'User') {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    req.user = user; // Optionally attach the user to the request
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

module.exports = {
  isAdmin,
  isUser
};