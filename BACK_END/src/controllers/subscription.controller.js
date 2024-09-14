const SubscriptionsModel = require('../Models/subscriptions');
const ProductsModel = require('../Models/products');

// Create a new subscription
const createSubscription = async (req, res) => {
  const { subscriptionId, productIds, payment_method, price, currency } = req.body; // Updated field name

  if (!subscriptionId || !productIds || !payment_method || !price || !currency) { // Updated field name
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find products
    const products = await ProductsModel.find({ productId: { $in: productIds } });
    if (products.length !== productIds.length) return res.status(404).json({ message: 'Some products not found' });

    // Create and save new subscription
    const newSubscription = new SubscriptionsModel({
      subscriptionId,
      products: productIds,
      start_date: new Date(),
      end_date: null,
      status: 'active',
      payment_method, // Updated field name
      price,
      currency
    });

    const savedSubscription = await newSubscription.save();

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
    const subscription = await SubscriptionsModel.findOne({ subscriptionId: id }).populate('products');
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

    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error });
  }
};

module.exports = {
  createSubscription,
  getSubscriptionById,
  removeProductFromSubscription,
  endSubscription,
  deleteSubscription,
};
