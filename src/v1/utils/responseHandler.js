module.exports = {
  success: (res, message = "Success", data = null, statusCode = 200) => {
      return res.status(statusCode).json({
          success: true,
          message,
          data,
      });
  },

  error: (res, message = "Something went wrong", errors = null, statusCode = 500) => {
      return res.status(statusCode).json({
          success: false,
          message,
          errors,
      });
  },

  validationError: (res, errors) => {
      return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
      });
  },

  unauthorized: (res, message = "Unauthorized access") => {
      return res.status(401).json({
          success: false,
          message,
      });
  }
};
