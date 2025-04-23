const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variables for security
const JWT_EXPIRATION = process.env.JWT_EXPIRATION_TIME ||'1h'; // Token expires in 1 hour
// Generate JWT Token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Verify JWT Token
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
module.exports = { generateToken, verifyToken };
