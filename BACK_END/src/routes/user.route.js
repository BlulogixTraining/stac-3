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

router.get('/users',getUsers);
router.get('/users/:id', getUser); 
router.post('/addUser',createUser); 
router.put('/updateUser/:id', updateUser); 
router.delete('/deleteUser/:id', deleteUser); 

module.exports = router;
