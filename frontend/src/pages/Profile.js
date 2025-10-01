import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const profileData = new FormData();
      profileData.append('name', formData.name);
      profileData.append('email', formData.email);
      
      if (formData.currentPassword) {
        profileData.append('password', formData.newPassword || formData.currentPassword);
      }
      
      if (avatar) {
        profileData.append('avatar', avatar);
      }

      await updateProfile(profileData);
      setMessage('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      
      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-preview">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>
          <div className="avatar-upload">
            <label htmlFor="avatar-upload" className="btn btn-secondary">
              Change Avatar
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={onAvatarChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        
        <div className="profile-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={onChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={onChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={onChange}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
          
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;