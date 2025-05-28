import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/products`; 

// Create new product
const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update product
const updateProduct = async (productId, productData) => {
const response = await axios.put(`${API_URL}/${productId}`, productData);
  return response.data;
};

// Delete product
const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}`);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

export default productService;