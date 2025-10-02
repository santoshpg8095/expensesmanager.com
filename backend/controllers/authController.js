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

// Send OTP for password reset
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    console.log('🔐 Forgot password request for email:', email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
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

    // Email template for OTP
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

    try {
      // Send email via Resend
      await sendEmail(
        user.email,
        'Password Reset OTP - Expense Manager',
        message,
        `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`
      );

      console.log('✅ OTP email sent successfully to:', email);

      res.status(200).json({
        success: true,
        message: 'OTP sent to your email successfully',
        email: user.email
      });

    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      
      // For development, return OTP in response if email fails
      if (process.env.NODE_ENV === 'development') {
        console.log('🛠️ Development mode: Returning OTP in response');
        res.status(200).json({
          success: true,
          message: 'OTP generated (development mode)',
          email: user.email,
          otp: otp,
          expiresAt: new Date(otpExpire).toISOString()
        });
      } else {
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpire = undefined;
        await user.save();
        
        res.status(500).json({
          success: false,
          message: 'Email service temporarily unavailable. Please try again later.'
        });
      }
    }

  } catch (error) {
    console.error('❌ Send OTP error:', error);
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