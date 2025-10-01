import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const FAQ = () => {
  const { darkMode } = useTheme();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          id: 1,
          question: "How do I create an account?",
          answer: "Click the 'Get Started' button on our homepage or navigate to the Register page. You can sign up with your email or use Google OAuth for faster registration."
        },
        {
          id: 2,
          question: "Is ExpenseTracker free to use?",
          answer: "Yes! We offer a free forever plan with all essential features. We also have premium plans with advanced analytics and additional features starting at $4.99/month."
        },
        {
          id: 3,
          question: "Can I use ExpenseTracker on multiple devices?",
          answer: "Absolutely! Your data syncs automatically across all your devices. You can access ExpenseTracker on web, iOS, and Android devices."
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Usage',
      icon: '⚡',
      questions: [
        {
          id: 4,
          question: "How do I categorize my expenses?",
          answer: "You can manually categorize expenses when adding them, or use our AI-powered auto-categorization that learns from your spending patterns over time."
        },
        {
          id: 5,
          question: "Can I set budget limits?",
          answer: "Yes! You can set monthly budgets for different categories and receive notifications when you're approaching your limits."
        },
        {
          id: 6,
          question: "Do you support multiple currencies?",
          answer: "Currently, we support USD, EUR, GBP, and CAD. More currencies are coming soon!"
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: '🔒',
      questions: [
        {
          id: 7,
          question: "Is my financial data secure?",
          answer: "Yes! We use bank-level encryption (AES-256) and never store your banking credentials. Your data is protected with multiple layers of security."
        },
        {
          id: 8,
          question: "Do you sell my data to third parties?",
          answer: "Never! We take your privacy seriously. We don't sell or share your personal or financial data with any third parties."
        },
        {
          id: 9,
          question: "Can I export my data?",
          answer: "Yes, you can export all your financial data in CSV or PDF format at any time from your account settings."
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Accounts',
      icon: '💳',
      questions: [
        {
          id: 10,
          question: "How do I cancel my subscription?",
          answer: "You can cancel your premium subscription at any time from your account settings. You'll continue to have access to premium features until the end of your billing period."
        },
        {
          id: 11,
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and Apple Pay for subscription payments."
        },
        {
          id: 12,
          question: "Can I delete my account?",
          answer: "Yes, you can permanently delete your account and all associated data from the account settings page. This action is irreversible."
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find quick answers to common questions about ExpenseTracker. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-2`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 ml-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text"
                placeholder="Search for answers..."
                className={`flex-1 py-4 bg-transparent border-0 focus:ring-0 ${
                  darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.id} className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}>
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{category.icon}</span>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {category.title}
                  </h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.questions.map((item) => (
                  <div key={item.id} className="p-6">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <h3 className={`text-lg font-semibold pr-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.question}
                      </h3>
                      <svg 
                        className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${
                          openItems[item.id] ? 'rotate-180' : ''
                        } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openItems[item.id] && (
                      <div className="mt-4">
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className={`mt-16 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 text-center`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Still Need Help?
          </h2>
          <p className={`mb-6 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our support team is here to help you get the most out of ExpenseTracker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Contact Support
            </button>
            <button className={`border ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            } font-semibold py-3 px-8 rounded-lg transition duration-300`}>
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;