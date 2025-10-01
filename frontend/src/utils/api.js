import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for OAuth cookies if needed
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration or invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optional: Redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
      // You can show a toast notification here
    }
    
    return Promise.reject(error);
  }
);

export default api;