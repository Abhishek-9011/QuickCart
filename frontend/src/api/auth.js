// src/api/auth.js
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL;

export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API}/user/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const signin = async (formData) => {
  try {
    const response = await axios.post(`${API}/user/signin`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signin failed" };
  }
};
