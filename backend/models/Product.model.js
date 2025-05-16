import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  images: [String],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: String,
  stock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);