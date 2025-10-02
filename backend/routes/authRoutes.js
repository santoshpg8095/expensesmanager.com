const express = require('express');
const router = express.Router();
const {
  register,
  login,
  googleAuth,
  googleCallback,
  getProfile,
  updateProfile,
  sendOTP,
  verifyOTP,
  resetPassword,
  logout,
  gmailAuth,
  gmailCallback
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Local authentication routes
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Gmail OAuth routes (for sending emails)
router.get('/gmail/auth', gmailAuth);
router.get('/gmail/callback', gmailCallback);

// Password reset routes with OTP
router.post('/forgot-password', sendOTP);
router.post('/verify-otp', verifyOTP);
router.put('/reset-password', resetPassword);

// Logout route
router.post('/logout', protect, logout);

// Profile routes (protected)
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

module.exports = router;