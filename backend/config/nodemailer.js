const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Nodemailer configuration error:', error);
  } else {
    console.log('✅ Nodemailer is ready to send emails');
  }
});

module.exports = transporter;