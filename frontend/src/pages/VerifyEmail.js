import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmail(token);
    } else {
      setError('Invalid verification link');
    }
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const res = await api.get(`/auth/verify-email?token=${token}`);
      setMessage(res.data.message);
      setVerified(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <h1>Email Verification</h1>
        {verified ? (
          <div className="success-message">
            <p>{message}</p>
            <Link to="/login" className="btn btn-primary">Login Now</Link>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <Link to="/register" className="btn btn-primary">Register Again</Link>
          </div>
        ) : (
          <p>Verifying your email...</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;