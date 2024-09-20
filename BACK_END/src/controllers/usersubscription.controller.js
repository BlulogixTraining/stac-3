const UserSubscriptionsModel = require('../Models/user_subscriptions');
const UsersModel = require('../Models/users.model');
const SubscriptionsModel = require('../Models/subscriptions');

const linkUserToSubscription = async (req, res) => {
  const { userId, subscriptionId } = req.body;

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

    // Create user-subscription link
    const userSubscription = new UserSubscriptionsModel({ userId, subscriptionId });
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
  const { subscriptionId } = req.params; // Assuming you're passing the subscription ID in the URL

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



module.exports = {
  getUsersCountAndIdsBySubscription,
  linkUserToSubscription,
  getAllSubscriptionsForUser,
  unlinkUserFromSubscription,
};
