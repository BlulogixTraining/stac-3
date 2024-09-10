const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./routes/user.route.js");
const UserModel = require("./Models/users.model.js");
const connectDB = require("./config/db.js")
const port = 3001;


require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", UserRoute);



try {
  connectDB();
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
} catch (error) {
  console.log(error);
}