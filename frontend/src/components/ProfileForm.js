import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './ProfileForm.css';

const ProfileForm = () => {
  const { user, updateProfile, error, clearErrors } = useAuth();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    if (error) {
      clearErrors();
    }
    
    if (message) {
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully');
      setFormData({
        ...formData,
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      // Error is handled in context
    }
  };

  return (
    <div className="profile-form-container">
      <h2>Profile Settings</h2>
      
      {error && (
        <div className="message error">
          {error}
        </div>
      )}
      
      {message && (
        <div className="message success">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">New Password (leave blank to keep current password)</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;