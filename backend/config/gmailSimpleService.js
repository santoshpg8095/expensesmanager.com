const nodemailer = require('nodemailer');

// Simple Gmail service using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // 16-character App Password
  },
});

const sendEmail = async (to, subject, html, text = '') => {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    
    const mailOptions = {
      from: `"Expense Manager" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
      text: text || subject.replace(/<[^>]*>/g, ''),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail');
    console.log('✅ Message ID:', result.messageId);
    
    return { 
      success: true, 
      service: 'gmail',
      messageId: result.messageId 
    };
    
  } catch (error) {
    console.error('❌ Gmail error:', error.message);
    
    if (error.code === 'EAUTH') {
      throw new Error('Gmail authentication failed. Check your App Password.');
    }
    
    throw new Error(`Gmail service error: ${error.message}`);
  }
};

// Verify configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Gmail configuration error:', error);
  } else {
    console.log('✅ Gmail is ready to send emails');
  }
});

module.exports = { sendEmail };