const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const { sendEmail } = require('../config/gmailSimpleService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      authMethod: 'local'
    });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        authMethod: user.authMethod,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check authentication method
    if (user.authMethod === 'google') {
      return res.status(401).json({
        success: false,
        message: 'Please login using Google authentication'
      });
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        authMethod: user.authMethod,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Google OAuth authentication
exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// Google OAuth callback
exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user, info) => {
    try {
      if (err) {
        console.error('Google OAuth error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
      }

      if (!user) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
      }

      // Generate token
      const token = generateToken(user._id);

      // Redirect to frontend with token
      res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
  })(req, res, next);
};

// Send OTP for password reset
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    console.log('🔐 Forgot password request for email:', email);

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal that user doesn't exist for security
      console.log('❌ User not found for email:', email);
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, we have sent an OTP'
      });
    }

    if (user.authMethod === 'google') {
      return res.status(400).json({
        success: false,
        message: 'Google authentication users cannot reset password'
      });
    }

    const otp = generateOTP();
    const otpExpire = Date.now() + 10 * 60 * 1000;

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpire = otpExpire;
    await user.save();

    console.log('🔐 OTP generated for user:', email, otp);

    // Simple text email message
    const message = `Hello ${user.name},

Your OTP for password reset is: ${otp}

This OTP is valid for 10 minutes.

If you didn't request this, please ignore this email.

Regards,
Expense Manager Team`;

    try {
      // Send email via Gmail
      const emailResult = await sendEmail(
        user.email,
        'Password Reset OTP - Expense Manager',
        message,
        message
      );

      console.log('✅ Email sent successfully to:', email);

      return res.status(200).json({
        success: true,
        message: 'OTP sent to your email successfully',
        email: user.email
      });

    } catch (emailError) {
      console.error('❌ Email sending error:', emailError.message);
      console.error('❌ Full error:', emailError);
      
      // Fallback: Return OTP in response if email fails
      console.log('🛠️ Email failed - returning OTP in response for testing');
      return res.status(200).json({
        success: true,
        message: 'OTP generated (email service unavailable)',
        email: user.email,
        otp: otp,
        expiresAt: new Date(otpExpire).toISOString(),
        note: 'Use this OTP for testing. Email error: ' + emailError.message
      });
    }

  } catch (error) {
    console.error('❌ Send OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};
// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log('🔐 OTP verification request for:', email, 'OTP:', otp);

    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Generate a verification token for the next step
    const verificationToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

    // Clear OTP after successful verification
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpire = undefined;

    await user.save();

    console.log('✅ OTP verified successfully for:', email);

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      resetToken: verificationToken
    });
  } catch (error) {
    console.error('❌ Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Reset password with token
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    console.log('🔐 Password reset request with token');

    // Hash token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.log('✅ Password reset successfully for:', user.email);

    // Confirmation email message
    const message = `Hello ${user.name},

Your password has been updated successfully.

If you didn't make this change, please contact us immediately.

Regards,
Expense Manager Team`;

    try {
      // Send confirmation email
      await sendEmail(
        user.email,
        'Password Updated Successfully - Expense Manager',
        message,
        message
      );
      
      console.log('✅ Confirmation email sent to:', user.email);
    } catch (emailError) {
      console.log('⚠️ Confirmation email failed to send:', emailError.message);
      // Don't fail the reset request if confirmation email fails
    }

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        authMethod: user.authMethod,
        currency: user.currency,
        monthlyBudget: user.monthlyBudget,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.currency = req.body.currency || user.currency;
      user.monthlyBudget = req.body.monthlyBudget || user.monthlyBudget;

      // Only update password for local auth users
      if (req.body.password && user.authMethod === 'local') {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          authMethod: updatedUser.authMethod,
          currency: updatedUser.currency,
          monthlyBudget: updatedUser.monthlyBudget,
          token: generateToken(updatedUser._id),
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};