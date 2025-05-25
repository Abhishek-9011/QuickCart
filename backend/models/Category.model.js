import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
});

const Category = mongoose.model('Category', categorySchema);
export default Category