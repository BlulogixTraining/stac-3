const SubscriptionsModel = require('../Models/subscriptions');
const UsersModel = require('../Models/users.model');
const ProductsModel = require('../Models/products');

const createSubscription = async (req, res) => {
  const { subscriptionId, user_Id, productIds, paymentMethod, price, currency } = req.body;

  if (!subscriptionId || !user_Id || !productIds || !paymentMethod || !price || !currency) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find user
    const user = await UsersModel.findOne({ user_id: user_Id });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find products
    const products = await ProductsModel.find({ productId: { $in: productIds } });
    if (products.length !== productIds.length) return res.status(404).json({ message: 'Some products not found' });

    // Create and save new subscription
    const newSubscription = new SubscriptionsModel({
      subscriptionId,
      user_id: user_Id,
      products: productIds,
      start_date: new Date(),
      end_date: null,
      status: 'active',
      payment_method: paymentMethod,
      price: price,
      currency: currency
    });

    const savedSubscription = await newSubscription.save();

    // Update user subscriptions
    user.subscriptions.push(savedSubscription.subscriptionId);
    await user.save();

    res.status(201).json({ message: 'Subscription created successfully', subscription: savedSubscription });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ message: 'Error creating subscription', error });
  }
};

// Find a subscription by ID
const getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await SubscriptionsModel.findOne({ subscriptionId: id }).populate('user_id').populate('products');
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error });
  }
};

// Remove a product from a subscription
const removeProductFromSubscription = async (req, res) => {
  const { subscriptionId, productId } = req.params;

  try {
    // Find subscription
    const subscription = await SubscriptionsModel.findOne({ subscriptionId });
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    // Check if the product exists in the subscription
    if (!subscription.products.includes(productId)) {
      return res.status(404).json({ message: 'Product not found in this subscription' });
    }

    // Remove the product from the subscription
    subscription.products.pull(productId);
    await subscription.save();

    res.status(200).json({ message: 'Product removed from subscription successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from subscription', error });
  }
};

// End a subscription (set status to inactive)
const endSubscription = async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    // Find subscription
    const subscription = await SubscriptionsModel.findOne({ subscriptionId });
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    // Update subscription status
    subscription.status = 'inactive';
    subscription.end_date = new Date(); // Set the end date to current date
    await subscription.save();

    // Optionally update user
    const user = await UsersModel.findOne({ userId: subscription.user_id });
    if (user) {
      // Remove the subscription from user's subscriptions list
      user.subscriptions.pull(subscriptionId);
      // Update user's subscription status
      user.isSubscribed = user.subscriptions.length > 0;
      await user.save();
    }

    res.status(200).json({ message: 'Subscription ended successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error ending subscription', error });
  }
};

// Delete a subscription (optional)
const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete subscription
    const subscription = await SubscriptionsModel.findOneAndDelete({ subscriptionId: id });
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    // Optionally update user
    const user = await UsersModel.findOne({ userId: subscription.user_id });
    if (user) {
      user.subscriptions.pull(id);
      user.isSubscribed = user.subscriptions.length > 0;
      await user.save();
    }

    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error });
  }
};

// Get all subscriptions for a user
const getAllSubscriptionsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UsersModel.findOne({ userId }).populate('subscriptions');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};

module.exports = {
  createSubscription,
  getSubscriptionById,
  removeProductFromSubscription,
  endSubscription,
  deleteSubscription,
  getAllSubscriptionsForUser
};

