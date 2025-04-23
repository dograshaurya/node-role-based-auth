const crypto = require("crypto");
const userQuery = require("../models/query/userQuery");
const PasswordReset = require("../models/database/PasswordReset");
const { encode, decode } = require("../utils/encryption"); // Your encryption utils
const { sendEmail } = require("./email.Service"); // Your email service
const { findUserByEmail, createUser } = require("../models/query/userQuery");
const { generateToken } = require('../utils/jwt');


const registerUser = async ({ name, email, password, role }) => {
  // Check if the email already exists
  const existingUser = await userQuery.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists!');
  }

  // Encrypt the password
  const encryptedPassword = await encode(password);

  // Create a new user
  const user = await userQuery.createUser({
    name, email, password, role
  });

  // Generate a JWT token
  const token = generateToken({ userId: user._id });

  return {
    user: { id: user._id, username: user.name, email: user.email },
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found!');
  }

  if (user.password !== password) {
    throw new Error('Invalid password!');
  }

  const token = generateToken({ userId: user._id, role: user.role});

  return { user, token };
};
/**
 * Service to handle forgot password logic.
 * @param {string} email - The user's email.
 * @returns {Promise<string>} - A message indicating the reset email was sent.
 */
const forgotPassword = async (email) => {

  const user = await userQuery.findUserByEmail(email);

  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

  await PasswordReset.create({ user_id: user._id, token, expires_at });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;
  await sendEmail(
    email,
    "Password Reset",
    `Click the link to reset your password: ${resetLink}`
  );

  return "Password reset link sent to email";
};

/**
 * Service to handle reset password logic.
 * @param {string} email - The user's email.
 * @param {string} token - The reset token received.
 * @param {string} newPassword - The new password.
 * @returns {Promise<string>} - A message indicating the password was reset.
 */
const resetPassword = async (email, token, newPassword) => {
  const resetEntry = await PasswordReset.findOne({ token });
  if (!resetEntry || resetEntry.expires_at < new Date()) {
    throw { status: 400, message: "Invalid or expired token" };
  }


  const user = await userQuery.findUserByEmail(email);
  if (!user) {
    throw { status: 404, message: "Invalid email" };
  }

  const encryptedPassword = await encode(newPassword);

  await userQuery.updateUser(user._id, { password: encryptedPassword });

  await PasswordReset.deleteOne({ token });

  return "Password reset successful.";
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
