// jobs/renewalJob.js
const cron = require('node-cron');
const userSubscriptionsController = require('../controllers/usersubscription.controller');

// Schedule a job to run daily at midnight
const scheduleRenewalJob = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running renewal job');
    try {
      await userSubscriptionsController.handleRenewals();
    } catch (error) {
      console.error('Error during renewal job:', error);
    }
  });
};

module.exports = { scheduleRenewalJob };
