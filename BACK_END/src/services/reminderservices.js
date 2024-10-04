// services/reminderService.js
const sendReminder = require('./nodeMailer'); // Your mailer service
const UserSubscriptionsModel = require('../Models/user_subscriptions');

const sendSubscriptionReminders = async () => {
  const now = new Date();
  const oneWeekFromNow = new Date(now);
  oneWeekFromNow.setDate(now.getDate() + 7);
  const oneDayFromNow = new Date(now);
  oneDayFromNow.setDate(now.getDate() + 1);

  try {
    // Fetch subscriptions that will expire in 7 days
    const expiringSoon = await UserSubscriptionsModel.find({
      end_date: { $gte: now, $lt: oneWeekFromNow },
    }).populate('userId');

    for (const subscription of expiringSoon) {
      const emailConfig = {
        from: process.env.USER_EMAIL,
        to: subscription.userId.email,
        subject: 'Subscription Expiration Reminder',
        text: `Your subscription will expire in 7 days on ${subscription.end_date}. Please renew to continue enjoying our services.`,
      };
      await sendReminder(emailConfig);
    }

    // Fetch subscriptions that will expire in 1 day
    const expiringSoonOneDay = await UserSubscriptionsModel.find({
      end_date: { $gte: now, $lt: oneDayFromNow },
    }).populate('userId');

    for (const subscription of expiringSoonOneDay) {
      const emailConfig = {
        from: process.env.USER_EMAIL,
        to: subscription.userId.email,
        subject: 'Subscription Expiration Reminder',
        text: `Your subscription will expire tomorrow on ${subscription.end_date}. Please renew to continue enjoying our services.`,
      };
      await sendReminder(emailConfig);
    }
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
};

module.exports = { sendSubscriptionReminders };
