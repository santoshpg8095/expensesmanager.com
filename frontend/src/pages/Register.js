import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  const { register, isAuthenticated, error, clearErrors, googleLogin, handleGoogleCallback } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Handle Google OAuth callback
    const token = searchParams.get('token');
    if (token) {
      handleGoogleCallback(token).then(() => {
        navigate('/dashboard');
      });
    }

    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, searchParams, handleGoogleCallback]);

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
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
    
    // Clear specific validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    
    if (error) {
      clearErrors();
    }
    
    // Clear password mismatch error
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      
      // Navigation will be handled by the useEffect when isAuthenticated changes
    } catch (error) {
      console.error('Registration error:', error);
      // Error is handled in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    googleLogin();
  };

  // Enhanced password strength indicator
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

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1>Create your account</h1>
        
        {error && (
          <div className="error-message">
            {typeof error === 'string' 
              ? error 
              : 'Registration failed. Please try again.'}
          </div>
        )}
        
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="google-signin-btn"
        >
          <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>

        <div className="divider">
          <span>Or sign up with email</span>
        </div>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={validationErrors.name ? 'error' : ''}
            />
            {validationErrors.name && (
              <div className="field-error">{validationErrors.name}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={validationErrors.email ? 'error' : ''}
            />
            {validationErrors.email && (
              <div className="field-error">{validationErrors.email}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Create a password (min. 6 characters)"
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirm your password"
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
            className={`btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div className="redirect-text">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Sign in to your existing account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;