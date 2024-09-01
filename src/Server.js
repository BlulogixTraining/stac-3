const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose
    .connect(
    "mongodb+srv://NEOSAMAH:TKlpmYpyOFILVEO0@caster.3ayoo.mongodb.net/Subscription_Manager"
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
