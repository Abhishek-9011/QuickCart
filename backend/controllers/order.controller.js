import Order from '../models/orderModel';

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
      totalPrice
    } = req.body;

    // Basic validation
    if (!userId || !items || items.length === 0 || !shippingAddress || !totalPrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
