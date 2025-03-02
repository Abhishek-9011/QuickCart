const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  address: String,
  street: String,
  city: String,
  state: String,
  country: String,
  createdAt: Date,
  updatedAt: Date,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  price: Number,
  stock: Number,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
  updatedAt: Date,
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  price: Number,
  createdAt: Date,
});
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference to Product model
      quantity: { type: Number, required: true }, // Quantity of the product in the cart
      price: { type: Number, required: true }, // Price of the product at the time it was added to the cart
    },
  ],
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = { User, Product, Order, Cart };
