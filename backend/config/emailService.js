const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Verify configuration
console.log('📧 Email Service: Resend configured');

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Expense Manager <onboarding@resend.dev>', // You can verify your domain later
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw error;
    }

    console.log('✅ Email sent successfully via Resend');
    return data;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

module.exports = { sendEmail };