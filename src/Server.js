const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
    console.log("Connected to MongoDB!");
    })
    .catch((error) => {
    console.error("MongoDB connection error:", error);
    });

const UserModel = require("./Models/users");

app.get("/users", async (req, res) => {
    try {
    const users = await UserModel.find();
    res.json(users);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
