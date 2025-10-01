import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseSummary = ({ summary }) => {
  const { darkMode } = useTheme();
  
  const categoryColors = {
    Food: '#FF6384',
    Transport: '#36A2EB',
    Entertainment: '#FFCE56',
    Utilities: '#4BC0C0',
    Healthcare: '#9966FF',
    Other: '#FF9F40',
  };

  // Prepare chart data
  const chartData = {
    labels: summary.byCategory.map(item => item._id),
    datasets: [
      {
        data: summary.byCategory.map(item => item.total),
        backgroundColor: summary.byCategory.map(item => categoryColors[item._id] || '#CCCCCC'),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#e2e8f0' : '#4a5568',
        },
      },
    },
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Expense Summary</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="h-64">
          {summary.byCategory.length > 0 ? (
            <Doughnut data={chartData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No data to display
            </div>
          )}
        </div>
        
        {/* Summary Details */}
        <div>
          <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>Total Expenses</h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>₹{summary.total.toFixed(2)}</p> {/* Changed from $ to ₹ */}
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>By Category</h3>
            <div className="space-y-3">
              {summary.byCategory.length > 0 ? (
                summary.byCategory.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: categoryColors[item._id] || '#CCCCCC' }}
                      ></div>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item._id}</span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>₹{item.total.toFixed(2)}</p> {/* Changed from $ to ₹ */}
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {summary.total > 0 ? ((item.total / summary.total) * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No expenses recorded yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;