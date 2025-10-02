const { google } = require('googleapis');
const nodemailer = require('nodemailer');

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
          user: process.env.GMAIL_USER,
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
    if (!this.transporter) {
      console.error('❌ Gmail transporter not initialized');
      throw new Error('Email service not configured');
    }

    try {
      console.log(`📧 Attempting to send email to: ${to}`);
      console.log(`📧 Subject: ${subject}`);

      const mailOptions = {
        from: `"Expense Manager" <${process.env.GMAIL_USER}>`,
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
      
      throw new Error(`Gmail service error: ${error.message}`);
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

module.exports = new GmailService();