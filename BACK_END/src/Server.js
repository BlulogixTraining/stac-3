const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./routes/user.route.js");
const RuleRoute = require("./routes/rule.route");
<<<<<<< S3-17+Debug
const SubscriptionRoute = require('./routes/subscription.route'); 
const resourceRoutes = require("./routes/resource.route.js");
=======
>>>>>>> dev
const connectDB = require("./config/db.js")
const port = 3001;


require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api", UserRoute);
app.use("/api", RuleRoute);


app.use("/api", SubscriptionRoute); 
app.use("/api", resourceRoutes);

try {
  connectDB();
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
} catch (error) {
  console.log(error);
}