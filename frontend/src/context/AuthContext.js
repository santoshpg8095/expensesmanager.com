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
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
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
  const toastShownRef = React.useRef(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
          const res = await axios.get('/auth/profile');
          dispatch({ type: 'USER_LOADED', payload: res.data.user });
        } catch (error) {
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

      if (!toastShownRef.current) {
        toast.success('Registration successful!');
        toastShownRef.current = true;
      }

      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: 'REGISTER_FAIL',
        payload: errorMessage,
      });

      if (!toastShownRef.current) {
        toast.error(errorMessage);
        toastShownRef.current = true;
      }

      throw error;
    } finally {
      setTimeout(() => {
        toastShownRef.current = false;
      }, 100);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/auth/login', formData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });

      if (!toastShownRef.current) {
        toast.success('Login successful!');
        toastShownRef.current = true;
      }

      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAIL',
        payload: errorMessage,
      });

      if (!toastShownRef.current) {
        toast.error(errorMessage);
        toastShownRef.current = true;
      }

      throw error;
    } finally {
      setTimeout(() => {
        toastShownRef.current = false;
      }, 100);
    }
  };

  const googleLogin = () => {
    toastShownRef.current = false;
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
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

      // Remove toast from here - let the component handle it
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Google login failed';
      dispatch({
        type: 'GOOGLE_LOGIN_FAIL',
        payload: errorMessage,
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    if (!toastShownRef.current) {
      toast.success('Logged out successfully');
      toastShownRef.current = true;
    }

    setTimeout(() => {
      toastShownRef.current = false;
    }, 100);
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