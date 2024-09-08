const UserModel = require("../Models/users.model");

// get users
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user by id
const getUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the id from the route parameters
    const user = await UserModel.findById(id); // Find the user by id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return the found user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create User
const createUser = async (req, res) => {
  try {
    const users = await UserModel.create(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the id from the route parameters

    // Find the user by id and update with new data
    const user = await UserModel.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await UserModel.findById(id);
    res.status(200).json(updatedUser); // Return the updated user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the id from the route parameters

    // Find the user by id and delete it
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
