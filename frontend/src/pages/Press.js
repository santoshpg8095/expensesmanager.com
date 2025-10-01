import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Press = () => {
  const { darkMode } = useTheme();
  
  const pressReleases = [
    {
      id: 1,
      title: "ExpenseTracker Raises $10M Series A to Revolutionize Personal Finance",
      date: "January 15, 2025",
      excerpt: "Funding will accelerate product development and expand team to meet growing demand for intuitive financial management tools.",
      download: "PDF"
    },
    {
      id: 2,
      title: "ExpenseTracker Launches AI-Powered Financial Insights",
      date: "December 10, 2024",
      excerpt: "New machine learning features provide personalized savings recommendations and spending pattern analysis.",
      download: "PDF"
    },
    {
      id: 3,
      title: "ExpenseTracker Surpasses 1 Million Users",
      date: "November 5, 2024",
      excerpt: "Milestone demonstrates growing demand for accessible financial technology that empowers users to achieve financial freedom.",
      download: "PDF"
    }
  ];

  const mediaCoverage = [
    {
      outlet: "TechCrunch",
      title: "This App Could Be the Key to Your Financial Freedom",
      date: "January 12, 2025",
      link: "#"
    },
    {
      outlet: "Forbes",
      title: "How ExpenseTracker Is Making Financial Literacy Accessible to All",
      date: "December 20, 2024",
      link: "#"
    },
    {
      outlet: "Business Insider",
      title: "10 Personal Finance Apps That Actually Save You Money",
      date: "December 5, 2024",
      link: "#"
    },
    {
      outlet: "The Wall Street Journal",
      title: "The Rise of User-Friendly Financial Technology",
      date: "November 18, 2024",
      link: "#"
    }
  ];

  const pressKit = {
    logo: "Company Logo Pack",
    brandAssets: "Brand Guidelines",
    teamPhotos: "Executive Team Photos",
    productScreenshots: "Product Screenshots"
  };

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Press & <span className="text-blue-600">Media</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Latest news, press releases, and media resources about ExpenseTracker.
          </p>
        </div>

        {/* Contact Information */}
        <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 mb-12`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Press Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Media Inquiries
              </h3>
              <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Email:</strong> press@expensetracker.com
              </p>
              <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <strong>Hours:</strong> Mon-Fri, 9AM-6PM EST
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Press Kit
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Download our press kit for logos, brand assets, and product images.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                Download Press Kit
              </button>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 mb-12`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Press Releases
          </h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div key={release.id} className={`p-6 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {release.title}
                    </h3>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {release.date}
                    </p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {release.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">
                      Read More
                    </button>
                    <button className={`border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-600' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm`}>
                      Download {release.download}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Media Coverage
          </h2>
          <div className="space-y-4">
            {mediaCoverage.map((article, index) => (
              <div key={index} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition duration-300`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {article.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.outlet} • {article.date}
                    </p>
                  </div>
                  <a 
                    href={article.link}
                    className={`mt-2 sm:mt-0 font-semibold ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition duration-300`}
                  >
                    Read Article →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;