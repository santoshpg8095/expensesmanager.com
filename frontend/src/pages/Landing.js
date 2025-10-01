import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              FINANCIAL FREEDOM STARTS HERE
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Track Your Expenses <span className="text-blue-600">Effortlessly</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Take control of your finances with our intuitive expense tracking application.
              Monitor your spending, analyze your habits, and achieve your financial goals with confidence.
            </p>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className={`font-bold py-4 px-10 rounded-xl text-lg transition duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-blue-600 hover:bg-gray-100 shadow-md hover:shadow-lg'}`}
                >
                  Login
                </Link>
              </div>
            )}

            {/* Trust indicators */}
            <div className="mt-12 flex flex-col items-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                TRUSTED BY THOUSANDS OF USERS
              </p>
              <div className="flex items-center space-x-6">
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.8/5 Rating</span>
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Bank-Level Security</span>
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Save 5+ Hours Monthly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Powerful Features for Financial Success
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to take control of your finances in one intuitive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className={`text-center p-8 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-all duration-300 hover:shadow-xl`}>
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Smart Expense Tracking</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Quickly add and categorize your expenses with our simple interface. Auto-categorization learns from your habits.
              </p>
            </div>

            <div className={`text-center p-8 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-all duration-300 hover:shadow-xl`}>
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Visual Analytics</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Understand your spending patterns with beautiful charts and graphs. Identify trends and opportunities to save.
              </p>
            </div>

            <div className={`text-center p-8 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-all duration-300 hover:shadow-xl`}>
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bank-Level Security</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Your financial data is encrypted and secure. We value your privacy with end-to-end encryption.
              </p>
            </div>
          </div>

          {/* Additional features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            <div className={`flex items-start p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Budget Planning</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Set custom budgets for different categories and receive alerts when you're approaching your limits.
                </p>
              </div>
            </div>

            <div className={`flex items-start p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Real-time Sync</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Access your financial data from any device. Changes sync instantly across all your devices.
                </p>
              </div>
            </div>

            <div className={`flex items-start p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Goal Tracking</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Set financial goals and track your progress. Get personalized recommendations to reach them faster.
                </p>
              </div>
            </div>

            <div className={`flex items-start p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Import & Export</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Easily import transactions from your bank accounts or export data for tax purposes and analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              What Our Users Say
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of satisfied users who have transformed their financial lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "This app has completely transformed how I manage my finances. I've saved over $2,000 in the first 3 months just by seeing where my money was going."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold mr-4">
                  JD
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>John Davis</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Small Business Owner</p>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "The visual reports are game-changing. I can see exactly where I'm overspending and make adjustments. Finally paid off my credit card debt!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold mr-4">
                  SK
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Sarah Kim</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Marketing Professional</p>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "As a freelancer, tracking expenses was a nightmare until I found this app. The categorization and reporting features save me hours each month."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold mr-4">
                  MR
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Michael Rodriguez</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Freelance Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-blue-600'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-white'}`}>
            Ready to Take Control of Your Finances?
          </h2>
          <p className={`text-xl mb-10 ${darkMode ? 'text-gray-300' : 'text-blue-100'}`}>
            Join thousands of users who are already managing their expenses effectively with our app. Start your journey to financial freedom today.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className={`font-bold py-4 px-10 rounded-xl text-lg transition duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl'}`}
              >
                Sign Up Free
              </Link>
              <Link
                to="/demo"
                className={`font-bold py-4 px-10 rounded-xl text-lg transition duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600' : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600'}`}
              >
                View Demo
              </Link>
            </div>
          )}

          <p className={`mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-blue-200'}`}>
            No credit card required • Free forever for basic features • 14-day premium trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">ExpenseTracker</div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted partner in financial management. We help thousands of users track expenses,
                achieve financial goals, and build better money habits with cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition transform hover:-translate-y-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition transform hover:-translate-y-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition transform hover:-translate-y-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white transition">Press</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-white transition">Community</Link></li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400">© 2025 ExpenseTracker. All rights reserved.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms of Service
                </Link>
                <Link
                  to="/security"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Security
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-700 pt-6 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  GDPR Compliant
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-5 h-5 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Bank-Level Security
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                Made with ❤️ for better financial futures
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;