import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import toast from 'react-hot-toast';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/auth/forgot-password', { email });
      
      if (res.data.success) {
        toast.success('OTP sent to your email!');
        setEmailSent(true);
        // Navigate to OTP verification page with email
        navigate('/verify-otp', { state: { email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
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
            />
          </div>

          <button
            type="submit"
            className={`btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
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