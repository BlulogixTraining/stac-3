const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const UserModel = require('../Models/users.model'); // Adjust path if needed
require('dotenv').config(); // Load environment variables

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Users to seed
    const usersToSeed = [
      {
        email: "john@example.com",
        password: "password123", // Will be hashed
        fullName: "John Doe",
        role: "User",
        phoneNumber: "123456789",
      },
      {
        email: "jane@example.com",
        password: "password456", // Will be hashed
        fullName: "Jane Smith",
        role: "Admin",
        phoneNumber: "987654321",
      },
      // Add more users if needed
    ];

    for (const user of usersToSeed) {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email: user.email });
      if (existingUser) {
        console.log(`User with email ${user.email} already exists.`);
        continue;
      }

      // Generate unique userId if not provided
      if (!user.userId) {
        user.userId = uuidv4();
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      // Create the user in the database
      const newUser = new UserModel(user);
      await newUser.save();

      // Generate JWT token
      const token = createToken(newUser.userId);

      console.log(`User ${newUser.email} seeded successfully with token: ${token}`);
    }

    console.log('All users seeded successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding users:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedUsers();
