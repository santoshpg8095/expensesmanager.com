// context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Initialize state with a function to check localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('darkMode');
      // If saved theme exists, use it
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
      // Otherwise, check system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    // Default to false for server-side rendering
    return false;
  });

  // Update localStorage and apply theme classes when darkMode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode);
      
      // Apply dark mode to both html and body elements
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        // Explicitly set body background for dark mode
        document.body.style.backgroundColor = '#1a202c';
        document.body.style.color = '#e2e8f0';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        // Explicitly set body background for light mode
        document.body.style.backgroundColor = '#f9fafb';
        document.body.style.color = '#1f2937';
      }
    }
  }, [darkMode]);

  // Initialize theme on first render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Apply initial theme based on state
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        // Explicitly set body background for dark mode
        document.body.style.backgroundColor = '#1a202c';
        document.body.style.color = '#e2e8f0';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        // Explicitly set body background for light mode
        document.body.style.backgroundColor = '#f9fafb';
        document.body.style.color = '#1f2937';
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};