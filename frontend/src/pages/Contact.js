import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Contact Us
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions or need support? We're here to help. Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Email</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>support@expensetracker.com</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Typically replies within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Phone</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>+1 (555) 123-4567</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Office</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>123 Financial District</p>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>San Francisco, CA 94105</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Response Time</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Within 24 hours</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>For all customer inquiries</p>
                </div>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-blue-800'}`}>Need Immediate Help?</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
                Check our <a href="/help" className="underline font-semibold">Help Center</a> for quick answers to common questions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name *
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject *
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea 
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
              
              <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                * Required fields
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;