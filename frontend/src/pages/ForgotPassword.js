import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import toast from 'react-hot-toast';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpData, setOtpData] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setOtpData(null);

    try {
      const res = await axios.post('/auth/forgot-password', { email });
      
      if (res.data.success) {
        // Always show OTP since we're returning it in the response
        setOtpData({
          otp: res.data.otp,
          expiresAt: res.data.expiresAt,
          emailSent: res.data.emailSent
        });
        
        if (res.data.emailSent) {
          toast.success('OTP sent to your email!');
        } else {
          toast.success(`OTP: ${res.data.otp} (Development Mode)`);
        }
        
        // Navigate to OTP verification page with email
        setTimeout(() => {
          navigate('/verify-otp', { state: { email } });
        }, 3000); // Give user time to see the OTP
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">
        <h1>Reset Your Password</h1>
        <p className="description">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>

        {otpData && (
          <div className="otp-display">
            <h3>🔐 Your OTP Code</h3>
            <div className="otp-code">{otpData.otp}</div>
            <p><strong>Expires:</strong> {new Date(otpData.expiresAt).toLocaleString()}</p>
            <p className="otp-note">
              {otpData.emailSent 
                ? 'OTP has been sent to your email. Use the code above if you don\'t receive it.'
                : 'Development Mode: Use this OTP for testing. In production, this would be sent via email.'
              }
            </p>
            <p>Redirecting to OTP verification page...</p>
          </div>
        )}

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpData} // Disable form after submission
            />
          </div>

          <button
            type="submit"
            className={`btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading || otpData}
          >
            {loading ? 'Sending OTP...' : otpData ? 'OTP Generated' : 'Send OTP'}
          </button>
        </form>

        <div className="back-to-login">
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;