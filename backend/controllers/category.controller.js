import Category from '../models/categoryModel.js';

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name, slug, parentCategoryId } = req.body;

    const existing = await Category.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'Slug must be unique' });

    const category = new Category({ name, slug, parentCategoryId: parentCategoryId || null });
    const saved = await category.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parentCategoryId', 'name');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parentCategoryId', 'name');
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name, slug, parentCategoryId } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, parentCategoryId: parentCategoryId || null },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
