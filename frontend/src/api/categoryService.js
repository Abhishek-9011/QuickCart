import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}/products`;
const createCategory = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};