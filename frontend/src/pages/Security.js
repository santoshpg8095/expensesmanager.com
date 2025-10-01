import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Security = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Security
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your financial data security is our top priority. We employ multiple layers of protection to keep your information safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-l-4 border-blue-500`}>
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Data Encryption
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              All your financial data is encrypted using AES-256 encryption, the same standard used by banks and financial institutions worldwide.
            </p>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-l-4 border-green-500`}>
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Two-Factor Authentication
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Add an extra layer of security to your account with 2FA. Protect your data even if your password is compromised.
            </p>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-l-4 border-purple-500`}>
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Regular Audits
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              We conduct regular security audits and penetration testing to ensure your data remains protected against emerging threats.
            </p>
          </div>
        </div>

        <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Security Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>SSL/TLS Encryption</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>All data transmitted between your device and our servers is encrypted</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Secure Data Centers</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Your data is stored in SOC 2 compliant data centers</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Regular Backups</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Automatic daily backups ensure your data is never lost</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Real-time Monitoring</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>24/7 security monitoring for suspicious activities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;