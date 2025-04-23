const { verifyToken } = require('../utils/jwt');

/**
 * Middleware to authenticate and check role
 */
const authenticate = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

      const decoded = verifyToken(token);
      req.user = decoded; // Attach decoded token payload (e.g., `userId`) to `req`

      // Check if role is allowed
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: You don't have permission." });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
  };
};


module.exports = { authenticate };
