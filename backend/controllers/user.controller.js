export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phoneNumber },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};