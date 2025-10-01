import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Added Link import
import axios from '../utils/api';
import toast from 'react-hot-toast';
import './NewPassword.css';

const NewPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetToken } = location.state || {};

  const validateForm = () => {
    const errors = {};
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!resetToken) {
      toast.error('Invalid reset token');
      navigate('/forgot-password');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put('/auth/reset-password', {
        token: resetToken,
        password: formData.password,
      });
      
      if (res.data.success) {
        toast.success('Password updated successfully! Check your email for confirmation.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    const labels = {
      0: '',
      25: 'Very Weak',
      50: 'Weak',
      75: 'Good',
      100: 'Strong'
    };
    
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (!email || !resetToken) {
    navigate('/forgot-password');
    return null;
  }

  return (
    <div className="new-password-container">
      <div className="new-password-form-container">
        <h1>Create New Password</h1>
        <p className="description">
          Create a new password for your account <strong>{email}</strong>
        </p>

        <form className="new-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className={validationErrors.password ? 'error' : ''}
            />
            {formData.password && (
              <div className="password-strength">
                <div 
                  className={`password-strength-meter strength-${Math.floor(passwordStrength.strength / 25)}`}
                  style={{ width: `${passwordStrength.strength}%` }}
                ></div>
                <span className="password-strength-label">
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {validationErrors.password && (
              <div className="field-error">{validationErrors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={validationErrors.confirmPassword ? 'error' : ''}
            />
            {validationErrors.confirmPassword && (
              <div className="field-error">{validationErrors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className={`btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>

        <div className="back-link">
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

export default NewPassword;