const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

console.log('📧 Email Service: Resend initialized');

const sendEmail = async (to, subject, html, text = '') => {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📧 Subject: ${subject}`);

    const { data, error } = await resend.emails.send({
      from: 'Expense Manager <onboarding@resend.dev>',
      to: to,
      subject: subject,
      html: html,
      text: text || subject, // Fallback text content
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      throw new Error(`Email service error: ${error.message}`);
    }

    console.log('✅ Email sent successfully via Resend');
    console.log('✅ Email ID:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Verify configuration on startup
const verifyEmailConfig = async () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY not found. Emails will not be sent.');
    return false;
  }
  
  try {
    // Test the API key by making a simple request
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend configuration verified');
    return true;
  } catch (error) {
    console.error('❌ Resend configuration failed:', error);
    return false;
  }
};

// Call verification on startup
verifyEmailConfig();

module.exports = { sendEmail, verifyEmailConfig };