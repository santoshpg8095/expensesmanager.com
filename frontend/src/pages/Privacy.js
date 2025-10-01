import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Privacy = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
          <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Privacy Policy
          </h1>
          
          <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Last updated: {new Date().getFullYear()}
            </p>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Collection & Usage
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                At ExpenseTracker, we are committed to protecting your privacy. We collect only essential information to provide you with the best expense tracking experience:
              </p>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Account information (email, name) for authentication</li>
                <li>Expense and income data you input for tracking and analysis</li>
                <li>Budget goals and financial targets for personalized insights</li>
                <li>Device information for security and optimization purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Protection
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your financial data is protected using industry-standard security measures:
              </p>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>End-to-end encryption for all sensitive financial data</li>
                <li>Regular security audits and penetration testing</li>
                <li>Two-factor authentication for enhanced account security</li>
                <li>Data anonymization for analytical purposes</li>
                <li>Secure server infrastructure with 24/7 monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Your Rights
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You have full control over your data:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Access and download your complete data at any time</li>
                <li>Modify or update your personal information</li>
                <li>Request permanent deletion of your account and data</li>
                <li>Opt-out of non-essential communications</li>
                <li>Export your financial data in multiple formats</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party Services
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We use trusted third-party services for essential functions like hosting, analytics, and customer support. All third-party providers are vetted for compliance with data protection regulations and are bound by strict data processing agreements.
              </p>
            </section>

            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                For any privacy-related questions or to exercise your data rights, please contact our Data Protection Officer at <span className="font-semibold">privacy@expensetracker.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;