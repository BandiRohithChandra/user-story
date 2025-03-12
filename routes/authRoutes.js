const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin, validatePasswordReset, handleValidationErrors } = require('../utils/validation');
const authenticate = require('../middleware/authMiddleware');

// User Registration
router.post('/register', validateRegistration, handleValidationErrors, authController.register);

// User Login
router.post('/login', validateLogin, handleValidationErrors, authController.login);

// Password Reset
router.post('/request-password-reset', validatePasswordReset, handleValidationErrors, authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

// Protected Route Example
// router.get('/profile', authenticate, authController.getProfile);

module.exports = router;