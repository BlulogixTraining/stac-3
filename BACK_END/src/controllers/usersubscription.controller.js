const UserSubscriptionsModel = require('../Models/user_subscriptions');
const UsersModel = require('../Models/users.model');
const SubscriptionsModel = require('../Models/subscriptions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure you have your Stripe secret key

// Link a user to a subscription
const linkUserToSubscription = async (req, res) => {
  const { userId, subscriptionId, autoRenewal = true } = req.body;

  if (!userId || !subscriptionId) {
    return res.status(400).json({ message: 'userId and subscriptionId are required' });
  }

  try {
    // Check if user exists
    const user = await UsersModel.findOne({ userId: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if subscription exists
    const subscription = await SubscriptionsModel.findOne({ subscriptionId });
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    // Set the next renewal date (30 days from now)
    const nextRenewalDate = new Date();
    nextRenewalDate.setDate(nextRenewalDate.getDate() + 30);

    // Create user-subscription link
    const userSubscription = new UserSubscriptionsModel({
      userId,
      subscriptionId,
      autoRenewal,
      nextRenewalDate,
    });
    await userSubscription.save();

    res.status(201).json({ message: 'User linked to subscription successfully', userSubscription });
  } catch (error) {
    console.error("Error linking user to subscription:", error);
    res.status(500).json({ message: 'Error linking user to subscription', error });
  }
};

// Get all subscriptions for a user
const getAllSubscriptionsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all subscriptions for the user
    const userSubscriptions = await UserSubscriptionsModel.find({ userId }).populate('subscriptionId');
    if (userSubscriptions.length === 0) return res.status(404).json({ message: 'No subscriptions found for this user' });

    res.status(200).json(userSubscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};

// Remove a subscription link
const unlinkUserFromSubscription = async (req, res) => {
  const { userId, subscriptionId } = req.params;

  try {
    // Remove the link
    const result = await UserSubscriptionsModel.findOneAndDelete({ userId, subscriptionId });
    if (!result) return res.status(404).json({ message: 'Link not found' });

    res.status(200).json({ message: 'Link removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing link', error });
  }
};

// Function to get count and IDs of users subscribed to a specific subscription
async function getUsersCountAndIdsBySubscription(req, res) {
  const { subscriptionId } = req.params;

  try {
    const userSubscriptions = await UserSubscriptionsModel.find({ subscriptionId });

    // Extract user IDs
    const userIds = userSubscriptions.map(us => us.userId);

    // Get the count of users
    const userCount = userIds.length;

    return res.status(200).json({
      userCount,
      userIds,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const handleRenewals = async () => {
  const now = new Date(); // Get the current date and time
  const userSubscriptions = await UserSubscriptionsModel.find({
    renewal: true,
  }).populate('subscriptionId');

  for (const userSubscription of userSubscriptions) {
    const subscription = userSubscription.subscriptionId;

    // Check if the subscription is active and if the end date has passed or is approaching
    if (subscription.status === 'active') {
      const endDate = new Date(subscription.end_date);

      // Check if the end date is today or has already passed
      if (endDate <= now) {
        try {
          // Call the processPayment function
          const paymentResponse = await processPayment({
            body: {
              userId: userSubscription.userId,
              amount: subscription.price * 100, // Assuming price is in dollars, convert to cents
              currency: subscription.currency,
            },
          });

          if (paymentResponse.success) {
            // If payment is successful, update the subscription end date
            const newEndDate = new Date(subscription.end_date);
            newEndDate.setDate(newEndDate.getDate() + 30); // Assuming a 30-day renewal
            subscription.end_date = newEndDate;
            await subscription.save();
            console.log(`Subscription renewed for user ${userSubscription.userId}`);
          } else {
            // Handle payment failure (e.g., cancel the subscription)
            subscription.status = 'inactive';
            await subscription.save();
            console.log(`Failed to charge user ${userSubscription.userId}, subscription canceled.`);
          }
        } catch (error) {
          console.error('Payment processing failed:', error);
          // Handle error accordingly
        }
      } else {
        console.log(`Subscription for user ${userSubscription.userId} is still active and does not require renewal.`);
      }
    }
  }
};

// Export the functions
module.exports = {
  getUsersCountAndIdsBySubscription,
  linkUserToSubscription,
  getAllSubscriptionsForUser,
  unlinkUserFromSubscription,
  handleRenewals, // Export the renewal handler
};
