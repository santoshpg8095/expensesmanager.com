import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Community = () => {
  const { darkMode } = useTheme();
  
  const communityStats = [
    { number: "50,000+", label: "Active Members" },
    { number: "100+", label: "Countries" },
    { number: "5,000+", label: "Success Stories" },
    { number: "24/7", label: "Support" }
  ];

  const forums = [
    {
      title: "Getting Started",
      description: "New to ExpenseTracker? Introduce yourself and get tips from experienced users.",
      threads: "1.2k",
      icon: "👋"
    },
    {
      title: "Budgeting & Planning",
      description: "Share budgeting strategies, ask for advice, and discuss financial planning.",
      threads: "3.4k",
      icon: "📊"
    },
    {
      title: "Saving & Investing",
      description: "Talk about saving strategies, investment tips, and wealth building.",
      threads: "2.1k",
      icon: "💰"
    },
    {
      title: "Success Stories",
      description: "Share your financial wins and get inspired by others' journeys.",
      threads: "4.7k",
      icon: "🎉"
    },
    {
      title: "Feature Requests",
      description: "Suggest new features and vote on upcoming improvements.",
      threads: "1.8k",
      icon: "💡"
    },
    {
      title: "Help & Support",
      description: "Get help with technical issues and usage questions.",
      threads: "2.9k",
      icon: "❓"
    }
  ];

  const successStories = [
    {
      name: "Sarah M.",
      achievement: "Paid off $15,000 debt",
      story: "Using ExpenseTracker helped me see where my money was going and create a realistic payoff plan.",
      avatar: "SM"
    },
    {
      name: "Mike R.",
      achievement: "Saved $10,000 for down payment",
      story: "The budgeting features made it easy to track progress toward my home ownership goal.",
      avatar: "MR"
    },
    {
      name: "Lisa T.",
      achievement: "Retired 5 years early",
      story: "Detailed expense tracking revealed opportunities to save more and invest wisely.",
      avatar: "LT"
    }
  ];

  const events = [
    {
      title: "Monthly Budget Challenge",
      date: "Starts Feb 1st",
      participants: "2,400+ joined",
      type: "Challenge"
    },
    {
      title: "Live Q&A with Financial Experts",
      date: "Jan 25th, 7 PM EST",
      participants: "Register Now",
      type: "Webinar"
    },
    {
      title: "Debt-Free Journey Workshop",
      date: "Feb 8th, 6 PM EST",
      participants: "Limited Spots",
      type: "Workshop"
    }
  ];

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Join Our <span className="text-blue-600">Community</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connect with thousands of users who are achieving financial freedom together. Share tips, get support, and celebrate wins.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className={`text-center p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {stat.number}
              </div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Forums Section */}
        <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 mb-12`}>
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Community Forums
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forums.map((forum, index) => (
              <div key={index} className={`p-6 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition duration-300 cursor-pointer`}>
                <div className="text-3xl mb-4">{forum.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {forum.title}
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {forum.description}
                </p>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {forum.threads} threads
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Join Community Forums
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Success Stories */}
          <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Success Stories
            </h2>
            <div className="space-y-6">
              {successStories.map((story, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold mr-4 flex-shrink-0">
                      {story.avatar}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {story.name}
                      </h3>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        {story.achievement}
                      </p>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {story.story}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {event.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.type === 'Challenge' 
                        ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                        : darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {event.date}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {event.participants}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-300">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;