const nodemailer = require('nodemailer');

// Multiple transporter configurations for better reliability
const createTransporter = () => {
  // Try different configurations
  const configs = [
    // Configuration 1: Standard Gmail with explicit settings
    {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    },
    // Configuration 2: Alternative port
    {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    },
    // Configuration 3: Direct SMTP
    {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    }
  ];

  return configs;
};

let currentConfigIndex = 0;
let transporter = null;

const initializeTransporter = () => {
  const configs = createTransporter();
  transporter = nodemailer.createTransporter(configs[currentConfigIndex]);
  console.log(`📧 Using Gmail configuration ${currentConfigIndex + 1}`);
};

// Initialize with first configuration
initializeTransporter();

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

    // Try to send email
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail');
    console.log('✅ Message ID:', result.messageId);
    
    return { 
      success: true, 
      service: 'gmail',
      messageId: result.messageId 
    };
    
  } catch (error) {
    console.error(`❌ Gmail error with config ${currentConfigIndex + 1}:`, error.message);
    
    // Try next configuration if available
    const configs = createTransporter();
    if (currentConfigIndex < configs.length - 1) {
      console.log(`🔄 Trying next configuration...`);
      currentConfigIndex++;
      initializeTransporter();
      
      try {
        return await sendEmail(to, subject, html, text);
      } catch (retryError) {
        console.error(`❌ All configurations failed. Last error:`, retryError.message);
        throw new Error(`All Gmail configurations failed: ${retryError.message}`);
      }
    }
    
    // Handle specific errors
    if (error.code === 'EAUTH') {
      throw new Error('Gmail authentication failed. Check your App Password or enable 2-Step Verification.');
    }
    
    if (error.code === 'ECONNECTION') {
      throw new Error('Connection failed. Gmail may be blocking the connection. Try using a different email service.');
    }
    
    if (error.code === 'ESOCKET') {
      throw new Error('Socket connection failed. Network issue or Gmail blocked.');
    }
    
    if (error.code === 'ETIMEDOUT') {
      throw new Error('Connection timeout. Gmail service may be temporarily unavailable.');
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

    // Test the transporter
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