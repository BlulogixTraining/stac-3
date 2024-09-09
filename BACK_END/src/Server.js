const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./routes/user.route.js");
const UserModel = require("./Models/users.model.js");

require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", UserRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
