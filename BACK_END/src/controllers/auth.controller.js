const UserModel = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();






const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };
  
  
  
  const SignUp = async (req, res) => {
    try {
      let {email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required.' });
      }
  
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
        const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ ...req.body, password: hashedPassword });
  
      await newUser.save();
  
      const token = createToken(newUser._id);
  
      res.status(201).json({
        message: 'User registered successfully.',
        token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
  
  const SignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Wrong email or password!' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Wrong email or password!' });
      }
  
      const token = createToken(user._id);
  
      res.status(200).json({
        message: 'Logged in successfully.',
        token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
module.exports = {
    SignUp,
    SignIn,
  };
  