const express = require("express");
const User = require("../Models/users.model");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { SignUp, SignIn} = require("../controllers/auth.controller");
const { isAdmin, isUser } = require('../middleware/authorize');

// User registration
router.post('/register', SignUp); // POST /register

// User login
router.post('/login', SignIn); // POST /login

// Get all users (admin only)
router.get('/users', isAdmin, getUsers); // GET /users

// Get a specific user by ID
router.get('/user/:id', isAdmin, getUser); // GET /user/:id

// Add a new user
router.post('/createuser', isAdmin, createUser); // POST /createuser

// Update a user by ID
router.put('/updateuser/:id', isAdmin, updateUser); // PUT /updateuser/:id

// Delete a user by ID
router.delete('/deleteuser/:id', isAdmin,  deleteUser); // DELETE /deleteuser/:id


module.exports = router;
