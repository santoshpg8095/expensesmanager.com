const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

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

// Gmail OAuth2 Service
class GmailService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_GMAIL_CLIENT_ID,
      process.env.GOOGLE_GMAIL_CLIENT_SECRET,
      process.env.NODE_ENV === 'production' 
        ? 'https://expensesmanager-com.onrender.com/api/auth/gmail/callback'
        : 'http://localhost:5000/api/auth/gmail/callback'
    );

    // Set refresh token if available
    if (process.env.GOOGLE_GMAIL_REFRESH_TOKEN) {
      this.oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_GMAIL_REFRESH_TOKEN
      });
    }

    this.transporter = null;
    this.initializeTransporter();
  }

  async initializeTransporter() {
    try {
      if (!process.env.GOOGLE_GMAIL_REFRESH_TOKEN) {
        console.warn('⚠️ Gmail refresh token not configured. Emails will not be sent.');
        return;
      }

      // Get access token
      const { token } = await this.oauth2Client.getAccessToken();
      
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER || 'santoshpgblr91@gmail.com',
          clientId: process.env.GOOGLE_GMAIL_CLIENT_ID,
          clientSecret: process.env.GOOGLE_GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_GMAIL_REFRESH_TOKEN,
          accessToken: token,
        },
      });

      console.log('✅ Gmail OAuth2 transporter initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Gmail transporter:', error.message);
    }
  }

  async sendEmail(to, subject, html, text = '') {
    // If Gmail OAuth2 is not configured, use fallback to console
    if (!this.transporter || !process.env.GOOGLE_GMAIL_REFRESH_TOKEN) {
      console.log('📧 Gmail not configured - falling back to console OTP');
      const otpMatch = html.match(/>(\d{6})</);
      const otp = otpMatch ? otpMatch[1] : 'N/A';
      
      console.log('📧 CONSOLE EMAIL (Gmail not configured):');
      console.log('   To:', to);
      console.log('   Subject:', subject);
      console.log('   OTP:', otp);
      
      return { 
        success: true, 
        service: 'console',
        otp: otp 
      };
    }

    try {
      console.log(`📧 Attempting to send email to: ${to}`);
      console.log(`📧 Subject: ${subject}`);

      const mailOptions = {
        from: `"Expense Manager" <${process.env.GMAIL_USER || 'santoshpgblr91@gmail.com'}>`,
        to: to,
        subject: subject,
        html: html,
        text: text || subject.replace(/<[^>]*>/g, ''),
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully via Gmail OAuth2');
      console.log('✅ Message ID:', result.messageId);
      
      return { 
        success: true, 
        service: 'gmail-oauth2',
        messageId: result.messageId 
      };
      
    } catch (error) {
      console.error('❌ Gmail OAuth2 error:', error.message);
      
      // If token is expired, try to refresh it
      if (error.code === 'EAUTH' && error.command === 'AUTH') {
        console.log('🔄 Access token expired, attempting to refresh...');
        try {
          await this.initializeTransporter();
          // Retry sending email
          return await this.sendEmail(to, subject, html, text);
        } catch (refreshError) {
          console.error('❌ Failed to refresh token:', refreshError.message);
        }
      }
      
      // Fallback to console if Gmail fails
      console.log('📧 Gmail failed - falling back to console OTP');
      const otpMatch = html.match(/>(\d{6})</);
      const otp = otpMatch ? otpMatch[1] : 'N/A';
      
      console.log('📧 CONSOLE EMAIL (Gmail failed):');
      console.log('   To:', to);
      console.log('   Subject:', subject);
      console.log('   OTP:', otp);
      
      return { 
        success: true, 
        service: 'console-fallback',
        otp: otp 
      };
    }
  }

  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  async getTokensFromCode(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('❌ Error getting tokens:', error);
      throw error;
    }
  }
}

// Initialize Gmail Service
const gmailService = new GmailService();

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

// Gmail OAuth authentication
exports.gmailAuth = (req, res) => {
  try {
    const authUrl = gmailService.getAuthUrl();
    console.log('🔐 Redirecting to Gmail OAuth:', authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error('❌ Gmail auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Gmail authentication failed'
    });
  }
};

// Gmail OAuth callback
exports.gmailCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code missing'
      });
    }

    const tokens = await gmailService.getTokensFromCode(code);
    
    console.log('✅ Gmail OAuth successful. Refresh token received.');
    console.log('🔐 Refresh token:', tokens.refresh_token);
    
    // Show the refresh token to add to environment variables
    res.send(`
      <html>
        <head>
          <title>Gmail OAuth Success</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .success { background: #d4edda; color: #155724; padding: 20px; border-radius: 8px; }
            .token-box { background: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; border-radius: 4px; font-family: monospace; margin: 15px 0; }
            .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="success">
            <h2>🎉 Gmail OAuth Successful!</h2>
            <p>Add this refresh token to your Render.com environment variables:</p>
          </div>
          
          <div class="token-box">${tokens.refresh_token}</div>
          
          <div class="info">
            <p><strong>Environment variable name:</strong> GOOGLE_GMAIL_REFRESH_TOKEN</p>
            <p><strong>Value:</strong> Copy the token above</p>
          </div>
          
          <p>After adding the token, restart your server and test the forgot password flow.</p>
          <p><a href="${process.env.CLIENT_URL}">Return to App</a></p>
        </body>
      </html>
    `);
    
  } catch (error) {
    console.error('❌ Gmail callback error:', error);
    res.status(500).json({
      success: false,
      message: 'Gmail authentication failed'
    });
  }
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
      // Send email via Gmail OAuth2 (with fallback to console)
      const emailResult = await gmailService.sendEmail(
        user.email,
        'Password Reset OTP - Expense Manager',
        message,
        `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`
      );

      console.log('✅ Email sending result:', emailResult.service);

      // Prepare response based on email service used
      let responseMessage = 'OTP sent to your email successfully';
      let showOtp = false;
      
      if (emailResult.service.includes('console')) {
        responseMessage = 'OTP generated (email service unavailable)';
        showOtp = true;
      }

      return res.status(200).json({
        success: true,
        message: responseMessage,
        email: user.email,
        ...(showOtp && { 
          otp: otp,
          expiresAt: new Date(otpExpire).toISOString(),
          note: 'Use this OTP for testing. Email service: ' + emailResult.service
        })
      });

    } catch (emailError) {
      console.error('❌ Email sending error:', emailError.message);
      
      // Fallback: Always return OTP in response
      return res.status(200).json({
        success: true,
        message: 'OTP generated (email service failed)',
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
      // Send confirmation email (optional - don't fail if email fails)
      await gmailService.sendEmail(
        user.email,
        'Password Updated Successfully - Expense Manager',
        message,
        `Your password has been updated successfully. If you didn't make this change, please contact us immediately.`
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