import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Terms = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
          <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Terms of Service
          </h1>
          
          <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Effective date: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                1. Account Terms
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>You must be at least 18 years old to use this service</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>One account per individual user</li>
                <li>You must provide accurate and complete registration information</li>
                <li>You are responsible for all activities that occur under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                2. Acceptable Use
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Use the service for personal financial management only</li>
                <li>Do not engage in any illegal or fraudulent activities</li>
                <li>Respect intellectual property rights and copyright laws</li>
                <li>Do not attempt to reverse engineer or hack the service</li>
                <li>No automated data scraping or bulk data extraction</li>
                <li>Do not interfere with the service's operation or security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                3. Service Availability
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We strive to maintain 99.9% service availability but cannot guarantee uninterrupted access. We may perform scheduled maintenance with advance notice and reserve the right to modify or discontinue features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                4. Data Ownership
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You retain all rights to your financial data. We only process your data to provide the service and do not claim ownership over your financial information. You can export your data at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                5. Termination
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You may delete your account at any time. We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, we will delete your data according to our data retention policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;