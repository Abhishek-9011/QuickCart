import Review from '../models/reviewModel.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    const review = new Review({ userId, productId, rating, comment });
    const saved = await review.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name')
      .populate('productId', 'title');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', 'name')
      .populate('productId', 'title');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching review', error: err });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err });
  }
};
