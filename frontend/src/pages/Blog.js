import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const { darkMode } = useTheme();
  
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Better Budgeting in 2025",
      excerpt: "Learn how to create a budget that actually works and helps you achieve your financial goals.",
      author: "Sarah Johnson",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      category: "Budgeting",
      image: "📊"
    },
    {
      id: 2,
      title: "The Psychology of Spending: Why We Buy",
      excerpt: "Understanding the emotional triggers behind spending can help you make better financial decisions.",
      author: "Dr. Michael Chen",
      date: "Jan 12, 2025",
      readTime: "7 min read",
      category: "Psychology",
      image: "🧠"
    },
    {
      id: 3,
      title: "How to Save $1,000 in 30 Days",
      excerpt: "Practical strategies to boost your savings quickly without drastically changing your lifestyle.",
      author: "Emily Rodriguez",
      date: "Jan 8, 2025",
      readTime: "4 min read",
      category: "Saving",
      image: "💰"
    },
    {
      id: 4,
      title: "Investment Basics for Beginners",
      excerpt: "A comprehensive guide to getting started with investing, even with small amounts of money.",
      author: "David Kim",
      date: "Jan 5, 2025",
      readTime: "8 min read",
      category: "Investing",
      image: "📈"
    },
    {
      id: 5,
      title: "Debt-Free Journey: Real Stories",
      excerpt: "Inspiring stories from people who paid off massive debt using simple expense tracking.",
      author: "Lisa Thompson",
      date: "Jan 2, 2025",
      readTime: "6 min read",
      category: "Success Stories",
      image: "🎯"
    },
    {
      id: 6,
      title: "Automating Your Finances for Success",
      excerpt: "How to set up automatic systems that help you save and invest without thinking about it.",
      author: "Alex Martinez",
      date: "Dec 28, 2024",
      readTime: "5 min read",
      category: "Automation",
      image: "⚡"
    }
  ];

  const categories = ["All", "Budgeting", "Saving", "Investing", "Psychology", "Success Stories", "Automation"];

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Financial Insights & <span className="text-blue-600">Tips</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Expert advice, success stories, and practical tips to help you master your finances and build wealth.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-medium transition duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}>
              <div className="p-6">
                <div className="text-4xl mb-4">{post.image}</div>
                <div className="flex items-center gap-4 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                    {post.category}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {post.readTime}
                  </span>
                </div>
                <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {post.title}
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {post.author}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.date}
                    </p>
                  </div>
                  <button className={`font-semibold ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition duration-300`}>
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className={`mt-16 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 text-center`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Get Financial Tips Delivered to Your Inbox
          </h2>
          <p className={`mb-6 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join 50,000+ subscribers who receive weekly financial insights and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;