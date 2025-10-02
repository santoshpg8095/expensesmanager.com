const nodemailer = require('nodemailer');

// Simple Gmail service using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // 16-character App Password
  },
  port: 587,
  secure: false, // Use TLS
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (to, subject, html, text = '') => {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📧 Gmail User: ${process.env.GMAIL_USER}`);
    console.log(`📧 App Password configured: ${process.env.GMAIL_APP_PASSWORD ? 'Yes' : 'No'}`);
    console.log(`📧 App Password length: ${process.env.GMAIL_APP_PASSWORD?.length || 0}`);
    
    const mailOptions = {
      from: `"Expense Manager" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
      text: text || subject.replace(/<[^>]*>/g, ''),
    };

    console.log('📧 Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Test the transporter first
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error('❌ Transporter verification failed:', error);
          reject(error);
        } else {
          console.log('✅ Transporter verified successfully');
          resolve(success);
        }
      });
    });

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail');
    console.log('✅ Message ID:', result.messageId);
    console.log('✅ Response:', result.response);
    
    return { 
      success: true, 
      service: 'gmail',
      messageId: result.messageId 
    };
    
  } catch (error) {
    console.error('❌ Gmail error details:', {
      code: error.code,
      message: error.message,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response
    });
    
    if (error.code === 'EAUTH') {
      throw new Error('Gmail authentication failed. Check your App Password or enable 2-Step Verification.');
    }
    
    if (error.code === 'ECONNECTION') {
      throw new Error('Connection failed. Check your internet connection or Gmail service.');
    }
    
    if (error.code === 'ESOCKET') {
      throw new Error('Socket connection failed. Network issue or Gmail blocked.');
    }
    
    throw new Error(`Gmail service error: ${error.message}`);
  }
};

// Initialize and verify on startup
const initializeGmail = async () => {
  try {
    console.log('🔧 Initializing Gmail service...');
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('GMAIL_USER or GMAIL_APP_PASSWORD not configured');
    }

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error('❌ Gmail configuration error:', error);
          reject(error);
        } else {
          console.log('✅ Gmail service initialized successfully');
          resolve(success);
        }
      });
    });
    
    return true;
  } catch (error) {
    console.error('❌ Gmail initialization failed:', error.message);
    return false;
  }
};

// Initialize on startup
initializeGmail();

module.exports = { sendEmail };