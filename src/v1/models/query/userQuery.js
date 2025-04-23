const User = require('../database/User');

// Create a new user
exports.createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

// Find user by email
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Find user by ID (optional for future use)
exports.findUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};