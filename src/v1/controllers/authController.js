const { validateLogin, validateRegister } = require('../validations/userValidation');
const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} = require("../services/auth.Service");
const { encode, hashPassword } = require("../utils/encryption");

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation is applied directly in the route
    const result = await loginUser({
      email: email,
      password: encode(password),
    });

    res.status(200).json({
      message: "Login successful!",
      user: result.user,
      token: result.token,
      role: result.user.role,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Register Controller
const registerUserController = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    // Encrypt name, email, and password
    const encryptedName = await name;
    const encryptedEmail = await email;
    const encryptedPassword = await encode(password);

    // Validation is applied directly in the route
    const result = await registerUser({
      name: encryptedName,
      email: encryptedEmail,
      password: encryptedPassword,
      role: role,
    });

    res.status(201).json({
      message: "Registration successful!",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await forgotPassword(email);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, token, password } = req.body;
    const message = await resetPassword(email, token, password);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  loginUserController,
  registerUserController,
  forgotPasswordController,
  resetPasswordController,
};
