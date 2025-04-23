const User = require("../models/database/User");



/**
 * Get a single user by ID with associated profile data.
 */
const getUserById = async (id, role) => {
  return User.findOne({ _id: id, role, isDeleted: false })
  .select("-password")
  .lean();
};

module.exports = {
  getUserById,
};
