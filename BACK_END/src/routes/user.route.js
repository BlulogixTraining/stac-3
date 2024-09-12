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

router.post("/SignUp", SignUp);
router.post("/SignIn", SignIn);

router.get('/users', isAdmin, getUsers); // Only Admins can access this route
router.get('/users/:id', isAdmin, getUser); // Only Admins can access this route
router.post('/addUser', isAdmin, createUser); // Only Admins can access this route
router.put('/updateUser/:id', isAdmin, updateUser); // Only Admins can access this route
router.delete('/deleteUser/:id', isAdmin, deleteUser); // Only Admins can access this route

module.exports = router;
