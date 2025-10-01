import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ProfileForm from '../components/ProfileForm';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleProfileUpdate = (success) => {
    if (success) {
      setMessage('Profile updated successfully!');
      setError('');
    } else {
      setError('Failed to update profile');
      setMessage('');
    }
    
    // Clear messages after 5 seconds
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 5000);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your account preferences and profile information</p>
      </div>
      
      <div className="settings-card">
        <h2>Profile Information</h2>
        <ProfileForm onUpdate={handleProfileUpdate} />
      </div>
      
      {message && (
        <div className="settings-message success">
          {message}
        </div>
      )}
      
      {error && (
        <div className="settings-message error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Settings;