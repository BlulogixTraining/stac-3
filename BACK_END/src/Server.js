const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const cron = require('node-cron');

const UserRoute = require("./routes/user.route.js");
const RuleRoute = require("./routes/rule.route");
const productRoutes = require('./routes/products.route.js');
const subscriptionRoutes = require('./routes/subscription.route.js');
const resourceRoutes = require("./routes/resource.route.js");
const userSubscriptionsRoutes = require('./routes/usersubscription.route');
const paymentRoutes = require('./routes/paymentMethod.route.js');
const paymentprocessRoutes = require('./routes/paymentprocess.js');
const invoiceRoutes = require('./routes/invoice.route.js');
const { scheduleRenewalJob } = require('./jobs/renewaljob'); // Import the cron job
const { sendSubscriptionReminders } = require('./services/reminderservices');

const connectDB = require("./config/db.js")
const port = 3001;


require("dotenv").config();
app.use("/swagger",swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// jobs
scheduleRenewalJob();

// Schedule the reminder function to run every day at 9 AM
cron.schedule('0 9 * * *', () => {
  console.log('Sending subscription reminders...');
  sendSubscriptionReminders();
});
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/users", UserRoute);
app.use("/rules", RuleRoute);
app.use('/subscriptions', subscriptionRoutes);
app.use('/products', productRoutes);
app.use("/resources", resourceRoutes);
app.use('/user-subscriptions', userSubscriptionsRoutes);
app.use('/payments', paymentRoutes);
app.use('/payments', paymentprocessRoutes);
app.use('/invoices', invoiceRoutes);



try {
  connectDB();
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
} catch (error) {
  console.log(error);
}

