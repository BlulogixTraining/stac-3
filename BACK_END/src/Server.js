const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const UserRoute = require("./routes/user.route.js");
const RuleRoute = require("./routes/rule.route");
const SubscriptionRoute = require('./routes/subscription.route'); 
const resourceRoutes = require("./routes/resource.route.js");
const connectDB = require("./config/db.js")
const port = 3001;


require("dotenv").config();
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDoc));


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", UserRoute);
app.use("/", RuleRoute);


app.use("/", SubscriptionRoute); 
app.use("/", resourceRoutes);

try {
  connectDB();
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
} catch (error) {
  console.log(error);
}