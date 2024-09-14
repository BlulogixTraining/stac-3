const UserModel = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const SignUp = async (req, res) => {
  try {
    let { email, password, userId } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Automatically generate a unique userId if it's not provided
    if (!userId) {
      userId = uuidv4();  // Generate unique userId using UUID
    }

    // Check if the userId already exists
    const existingUserId = await UserModel.findOne({ userId });
    if (existingUserId) {
      return res.status(400).json({ message: 'User ID already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new UserModel({ ...req.body, userId, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token
    const token = createToken(newUser.userId);

    res.status(201).json({
      message: 'User registered successfully.',
      token,
    });

  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error
      return res.status(400).json({ message: `Duplicate key error: ${JSON.stringify(err.keyValue)}` });
    }
    // Handle other errors
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

    const token = createToken(user.userId);

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
