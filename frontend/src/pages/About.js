// frontend/src/pages/About.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
          <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About ExpenseTracker
          </h1>
          
          <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We're on a mission to help people achieve financial freedom through better expense tracking and money management.
            </p>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Story
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded in 2025, ExpenseTracker was born from a simple observation: most people struggle to understand where their money goes each month. We set out to create an intuitive, powerful tool that makes financial management accessible to everyone.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Mission
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To empower individuals and families to take control of their finances, reduce financial stress, and build wealth through better spending habits and financial awareness.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;