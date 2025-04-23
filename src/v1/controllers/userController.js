const multer = require("multer");
const path = require("path");
const { encode } = require("../utils/encryption");
const userService = require("../services/user.Service");
const { success, error } = require("../utils/responseHandler");

// Constants
const VALID_ROLES = ["customer", "agent"];

// Configure Multer storage for profile image uploads
const storage = multer.diskStorage({
  destination: "uploads/profile-images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Utility function for role validation
const validateRole = (role, res) => {
  if (!VALID_ROLES.includes(role)) {
    error(res, "Invalid role. Use 'customer' or 'agent'", 400);
    return false;
  }
  return true;
};

/**
 * Get users by role with pagination and optional search
 */
exports.getUsers = async (req, res) => {
  try {
    const { role, search = "" } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!validateRole(role, res)) return;

    const result = await userService.getUsersByRole(
      role,
      search,
      parseInt(page),
      parseInt(limit)
    );

    success(res, `${role}s fetched successfully`, result);
  } catch (err) {
    console.error("Error fetching users:", err);
    error(res, err.message || "Failed to fetch users", 500);
  }
};

/**
 * Get a single user by ID and role
 */
exports.getUserById = async (req, res) => {
  try {
    const { role, id } = req.params;
    if (!validateRole(role, res)) return;

    const user = await userService.getUserById(id, role);
    if (!user) return error(res, `${role} not found`, 404);

    success(res, `${role} fetched successfully`, user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    error(res, err.message || "Failed to fetch user", 500);
  }
};

/**
 * Create a new user (Customer or Agent)
 */
exports.createUser = [
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { role } = req.params;
      if (!validateRole(role, res)) return;

      const profilePicture = req.file?.path || null;
      const userData = { ...req.body, password: encode(req.body.password), role, profilePicture };

      const newUser = await userService.createUser(userData);

      // Create related records based on role
      const createRoleRecord = role === "agent" ? userService.createAgent : userService.createCustomer;
      await createRoleRecord({ ...req.body, userId: newUser._id });

      success(res, `${role} created successfully`, newUser, 201);
    } catch (err) {
      console.error("Error creating user:", err);
      error(res, err.message || "Failed to create user", 500);
    }
  },
];

/**
 * Update an existing user (Customer or Agent)
 */
exports.updateUser = [
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { role, id } = req.params;
      if (!validateRole(role, res)) return;

      const updatedData = { ...req.body, profilePicture: req.file?.path };
      delete updatedData._id;
      delete updatedData.userId;
      
      console.log('password',updatedData.password);
      if (updatedData.password) {
        updatedData.password = encode(updatedData.password);
      }

      const updatedUser = await userService.updateUser(id, role, updatedData);
      if (!updatedUser?.success) return error(res, `${role} not found`, 404);

      // Update role-specific records
      const updateRoleRecord = role === "agent" ? userService.updateAgent : userService.updateCustomer;
      await updateRoleRecord(id, updatedData);

      success(res, `${role} updated successfully`, updatedUser.data);
    } catch (err) {
      console.error("Error updating user:", err);
      error(res, err.message || "Failed to update user", 500);
    }
  },
];

/**
 * Soft delete a user by ID and role
 */
exports.deleteUser = async (req, res) => {
  try {
    const { role, id } = req.params;
    if (!validateRole(role, res)) return;

    const deletedUser = await userService.deleteUser(id, role);
    if (!deletedUser) return error(res, `${role} not found`, 404);

    success(res, `${role} deleted successfully`);
  } catch (err) {
    console.error("Error deleting user:", err);
    error(res, err.message || "Failed to delete user", 500);
  }
};

module.exports.upload = upload;