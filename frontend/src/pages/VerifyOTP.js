import React, { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from '../utils/api';
import toast from 'react-hot-toast';
import './VerifyOTP.css';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOtp = pastedData.slice(0, 6).split('');
    
    if (pastedOtp.every(char => /^\d*$/.test(char))) {
      const newOtp = [...otp];
      pastedOtp.forEach((char, index) => {
        if (index < 6) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
      
      // Focus the last input
      const lastFilledIndex = pastedOtp.length - 1;
      if (lastFilledIndex < 5) {
        inputRefs.current[lastFilledIndex + 1]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/auth/verify-otp', { 
        email, 
        otp: otpString 
      });
      
      if (res.data.success) {
        toast.success('OTP verified successfully!');
        navigate('/new-password', { 
          state: { 
            email, 
            resetToken: res.data.resetToken 
          } 
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await axios.post('/auth/forgot-password', { email });
      if (res.data.success) {
        toast.success('New OTP sent to your email!');
        setOtp(['', '', '', '', '', '', '']);
        inputRefs.current[0].focus();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    }
  };

  if (!email) {
    navigate('/forgot-password');
    return null;
  }

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-form-container">
        <h1>Verify OTP</h1>
        <p className="description">
          Enter the 6-digit OTP sent to <strong>{email}</strong>
        </p>

        <form className="verify-otp-form" onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="otp-input"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className={`btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="resend-otp">
          <p>
            Didn't receive the OTP?{' '}
            <button
              type="button"
              onClick={handleResendOTP}
              className="resend-link"
            >
              Resend OTP
            </button>
          </p>
        </div>

        <div className="back-link">
          <Link
            to="/forgot-password"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;