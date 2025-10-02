const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const { sendEmail } = require('../config/emailService');

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

    // Try to send email via Resend (only for verified email)
    let emailSent = false;
    let emailError = null;

    // Only attempt to send email if it's the verified Resend email
    if (email === 'santoshpgblr91@gmail.com') {
      try {
        const message = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Expense Manager</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Smart Expense Tracking</p>
            </div>
            
            <div style="padding: 30px; background: #f8f9fa;">
              <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                Hello <strong>${user.name}</strong>,
              </p>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                You have requested to reset your password. Use the OTP below to verify your identity:
              </p>
              
              <div style="background: #fff; padding: 20px; border-radius: 10px; text-align: center; border: 2px dashed #667eea; margin: 20px 0;">
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; margin: 10px 0;">
                  ${otp}
                </div>
                <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                  This OTP is valid for 10 minutes
                </p>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center; margin-top: 25px;">
                If you didn't request this, please ignore this email.
              </p>
            </div>
            
            <div style="background: #2d3748; padding: 20px; text-align: center; color: #a0aec0;">
              <p style="margin: 0; font-size: 14px;">
                &copy; 2024 Expense Manager Team. All rights reserved.
              </p>
              <p style="margin: 5px 0 0 0; font-size: 12px;">
                Smart expense tracking made simple
              </p>
            </div>
          </div>
        `;

        await sendEmail(
          user.email,
          'Password Reset OTP - Expense Manager',
          message,
          `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`
        );

        emailSent = true;
        console.log('✅ OTP email sent successfully to:', email);

      } catch (error) {
        emailError = error.message;
        console.error('❌ Email sending failed:', emailError);
      }
    } else {
      console.log('📧 Email not sent - recipient not verified with Resend');
    }

    // Always return OTP in response for testing
    return res.status(200).json({
      success: true,
      message: emailSent 
        ? 'OTP sent to your email successfully' 
        : 'OTP generated successfully (development mode)',
      email: user.email,
      otp: otp, // Always return OTP for testing
      expiresAt: new Date(otpExpire).toISOString(),
      emailSent: emailSent,
      note: emailSent ? undefined : 'Use this OTP for testing. In production, this would be sent via email.'
    });

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

    // Confirmation email template
    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Expense Manager</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Smart Expense Tracking</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="background: #10b981; color: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px;">
              ✓
            </div>
          </div>
          
          <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Password Updated Successfully</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px; text-align: center;">
            Hello <strong>${user.name}</strong>,
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px; text-align: center;">
            Your password has been updated successfully.
          </p>
          
          <div style="background: #fff; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #10b981; margin: 20px 0;">
            <p style="color: #666; margin: 0;">
              <strong>Account:</strong> ${user.email}<br>
              <strong>Time:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div style="background: #fef3cd; border: 1px solid #fde68a; padding: 15px; border-radius: 8px; margin-top: 25px;">
            <p style="color: #92400e; margin: 0; font-size: 14px; text-align: center;">
              ⚠️ If you didn't make this change, please contact us immediately.
            </p>
          </div>
        </div>
        
        <div style="background: #2d3748; padding: 20px; text-align: center; color: #a0aec0;">
          <p style="margin: 0; font-size: 14px;">
            &copy; 2024 Expense Manager Team. All rights reserved.
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px;">
            Smart expense tracking made simple
          </p>
        </div>
      </div>
    `;

    try {
      // Send confirmation email
      await sendEmail(
        user.email,
        'Password Updated Successfully - Expense Manager',
        message,
        `Your password has been updated successfully. If you didn't make this change, please contact us immediately.`
      );
      
      console.log('✅ Confirmation email sent to:', user.email);
    } catch (emailError) {
      console.log('⚠️ Confirmation email failed to send:', emailError);
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

// Logout user (optional)
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