const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeItemFromCart,
  clearCart
} = require('../controllers/cartController');

// POST /api/cart - Add item or create cart
router.post('/', addToCart);

// GET /api/cart/:userId - Get user's cart
router.get('/:userId', getCartByUserId);

// PUT /api/cart/update - Update quantity of item
router.put('/update', updateCartItem);

// DELETE /api/cart/remove - Remove specific item
router.delete('/remove', removeItemFromCart);

// DELETE /api/cart/clear/:userId - Clear entire cart
router.delete('/clear/:userId', clearCart);

export default router;
