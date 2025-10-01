import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'GOOGLE_LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'GOOGLE_LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      // Clear axios authorization header
      delete axios.defaults.headers.common['Authorization'];
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload || null,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          const res = await axios.get('/auth/profile');
          dispatch({ type: 'USER_LOADED', payload: res.data.user });
        } catch (error) {
          console.error('Failed to load user:', error);
          dispatch({ type: 'AUTH_ERROR', payload: error.response?.data?.message });
        }
      } else {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };
    loadUser();
  }, []);

  const register = async (formData) => {
    try {
      const res = await axios.post('/auth/register', formData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      toast.success('Registration successful!');
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: 'REGISTER_FAIL',
        payload: errorMessage,
      });
      toast.error(errorMessage);
      throw error;
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/auth/login', formData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      toast.success('Login successful!');
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAIL',
        payload: errorMessage,
      });
      toast.error(errorMessage);
      throw error;
    }
  };

  const googleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/google`;
  };

  const handleGoogleCallback = async (token) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const res = await axios.get('/auth/profile');
      
      dispatch({ 
        type: 'GOOGLE_LOGIN_SUCCESS', 
        payload: { 
          token,
          user: res.data.user 
        } 
      });
      
      toast.success('Google login successful!');
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Google login failed';
      dispatch({
        type: 'GOOGLE_LOGIN_FAIL',
        payload: errorMessage,
      });
      toast.error(errorMessage);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async () => {
    try {
      // Optional: Call backend logout endpoint if you have one
      // await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear frontend state
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    }
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        googleLogin,
        handleGoogleCallback,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};