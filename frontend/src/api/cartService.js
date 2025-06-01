import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/cart`;

// Add item to cart or update quantity
const addToCart = async (cartData) => {
  const response = await axios.post(API_URL, cartData);
  return response.data;
};

// Get cart by user ID
const getCartByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

// Update item quantity in cart
const updateCartItem = async (updateData) => {
  const response = await axios.put(`${API_URL}/`, updateData);
  return response.data;
};

// Remove item from cart
const removeItemFromCart = async (cartItemData) => {
  const response = await axios.delete(`${API_URL}/`, { data: cartItemData });
  return response.data;
};

// Clear cart
const clearCart = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
};

const cartService = {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};

export default cartService;