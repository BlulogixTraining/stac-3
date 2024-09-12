const SubscriptionsModel = require('../Models/subscriptions'); // Adjust path as needed
const UsersModel = require('../Models/users.model'); // Adjust path as needed

// Create a subscription
const createSubscription = async (req, res) => {
  const { subscriptionId, user_id, start_date, end_date, payment_method, price, currency } = req.body;

  if (!user_id || !start_date || !end_date || !payment_method || !price || !currency) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await UsersModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newSubscription = new SubscriptionsModel({
      subscriptionId: subscriptionId, // Generate unique ID
      user_id,
      start_date,
      end_date,
      status: true, // Active subscription
      payment_method,
      price,
      currency,
    });

    await newSubscription.save();

    user.subscriptions.push(newSubscription._id);
    user.isSubscribed = true;
    await user.save();

    res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error });
  }
};

// View all subscriptions for a user
const viewSubscriptions = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  try {
    const user = await UsersModel.findById(user_id).populate('subscriptions');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ subscriptions: user.subscriptions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};

// Unsubscribe (delete a subscription)
const unsubscribe = async (req, res) => {
  const { subscriptionId } = req.params;

  if (!subscriptionId) {
    return res.status(400).json({ message: 'Subscription ID is required' });
  }

  try {
    const subscription = await SubscriptionsModel.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const user = await UsersModel.findById(subscription.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove subscription from user's subscriptions array
    user.subscriptions.pull(subscriptionId);
    user.isSubscribed = user.subscriptions.length > 0; // Update subscription status
    await user.save();

    // Delete the subscription
    await SubscriptionsModel.findByIdAndDelete(subscriptionId);

    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unsubscribing', error });
  }
};

module.exports = {
  createSubscription,
  viewSubscriptions,
  unsubscribe,
};
