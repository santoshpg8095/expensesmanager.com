import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Careers = () => {
  const { darkMode } = useTheme();
  
  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our team to build beautiful, responsive user interfaces for our financial tracking platform."
    },
    {
      id: 2,
      title: "Backend Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Develop scalable backend systems and APIs for our expense tracking application."
    },
    {
      id: 3,
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create intuitive user experiences that make financial management simple and enjoyable."
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Support",
      location: "New York, NY",
      type: "Full-time",
      description: "Help our users achieve their financial goals through exceptional customer service."
    }
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "We offer industry-leading compensation packages"
    },
    {
      icon: "🏥",
      title: "Health Insurance",
      description: "Comprehensive medical, dental, and vision coverage"
    },
    {
      icon: "🏝️",
      title: "Unlimited PTO",
      description: "Take time off when you need it to recharge"
    },
    {
      icon: "🏠",
      title: "Remote Work",
      description: "Work from anywhere with our flexible remote policy"
    },
    {
      icon: "📚",
      title: "Learning Budget",
      description: "$2,000 annual budget for professional development"
    },
    {
      icon: "⚡",
      title: "Latest Equipment",
      description: "Top-of-the-line hardware and software tools"
    }
  ];

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Build the Future of <span className="text-blue-600">Financial Technology</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join our mission to help millions of people achieve financial freedom through intuitive technology and data-driven insights.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Why Join ExpenseTracker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-l-4 border-blue-500`}>
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {benefit.title}
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8`}>
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Open Positions
          </h2>
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className={`p-6 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} hover:shadow-md transition-shadow`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        {job.department}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                        {job.location}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                        {job.type}
                      </span>
                    </div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {job.description}
                    </p>
                  </div>
                  <button className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No suitable position */}
          <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Don't see a perfect fit?
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We're always looking for talented people to join our team.
            </p>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              Send General Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;