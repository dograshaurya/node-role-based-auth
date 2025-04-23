const { check, validationResult } = require('express-validator');

exports.validateLogin = [
  check('email')
    .isEmail()
    .withMessage('Please include a valid email'),
  check('password')
    .not().isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateRegister = [
  check('name')
    .not().isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Please include a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
