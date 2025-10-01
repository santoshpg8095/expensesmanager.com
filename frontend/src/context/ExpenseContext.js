import React, { createContext, useContext, useReducer } from 'react';
import axios from '../utils/api';
import { useAuth } from './AuthContext';

// Create context
const ExpenseContext = createContext();

// Initial state
const initialState = {
  expenses: [],
  currentPage: 1,
  totalPages: 1,
  totalExpenses: 0,
  summary: {
    byCategory: [],
    total: 0,
  },
  loading: false,
  error: null,
};

// Reducer
const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_EXPENSES':
      return {
        ...state,
        expenses: action.payload.expenses,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalExpenses: action.payload.totalExpenses,
        loading: false,
      };
    case 'GET_SUMMARY':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        totalExpenses: state.totalExpenses + 1,
        loading: false,
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense._id === action.payload._id ? action.payload : expense
        ),
        loading: false,
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload),
        totalExpenses: state.totalExpenses - 1,
        loading: false,
      };
    case 'EXPENSE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Provider component
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { token } = useAuth();

  // Set auth token
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Get expenses
  const getExpenses = async (page = 1, limit = 10) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get(`/expenses?page=${page}&limit=${limit}`); // Removed /api prefix
      dispatch({ type: 'GET_EXPENSES', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: error.response?.data?.message || 'Error fetching expenses',
      });
    }
  };

  // Get expense summary
  const getExpenseSummary = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get('/expenses/summary'); // Removed /api prefix
      dispatch({ type: 'GET_SUMMARY', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: error.response?.data?.message || 'Error fetching summary',
      });
    }
  };

  // Add expense
  const addExpense = async (expenseData) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.post('/expenses', expenseData); // Removed /api prefix
      dispatch({ type: 'ADD_EXPENSE', payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: error.response?.data?.message || 'Error adding expense',
      });
      throw error;
    }
  };

  // Update expense
  const updateExpense = async (id, expenseData) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.put(`/expenses/${id}`, expenseData); // Removed /api prefix
      dispatch({ type: 'UPDATE_EXPENSE', payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: error.response?.data?.message || 'Error updating expense',
      });
      throw error;
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      await axios.delete(`/expenses/${id}`); // Removed /api prefix
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    } catch (error) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: error.response?.data?.message || 'Error deleting expense',
      });
      throw error;
    }
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        totalExpenses: state.totalExpenses,
        summary: state.summary,
        loading: state.loading,
        error: state.error,
        getExpenses,
        getExpenseSummary,
        addExpense,
        updateExpense,
        deleteExpense,
        clearErrors,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use expense context
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};