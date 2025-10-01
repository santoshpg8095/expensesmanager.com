import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import ExpenseSummary from '../components/ExpenseSummary';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { summary, getExpenseSummary, expenses, getExpenses, loading } = useExpense();
  const { darkMode } = useTheme();

  useEffect(() => {
    getExpenseSummary();
    getExpenses(1, 5);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dashboard</h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Welcome to your expense dashboard</p>
      </div>
      
      {/* Summary Section */}
      <ExpenseSummary summary={summary} />
      
      {/* Recent Expenses */}
      <div className={`mt-8 p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Expenses</h2>
          <div className="flex space-x-2">
            <Link
              to="/expenses"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View All
            </Link>
            <Link
              to="/reports"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Reports
            </Link>
          </div>
        </div>
        
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <p className={darkMode ? 'text-gray-400 mb-4' : 'text-gray-600 mb-4'}>You haven't added any expenses yet.</p>
            <Link
              to="/expenses"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Your First Expense
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
                {expenses.slice(0, 5).map((expense) => (
                  <tr key={expense._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {expense.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ₹{parseFloat(expense.amount).toFixed(2)} {/* Changed from $ to ₹ */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          to="/expenses"
          className={`p-6 rounded-lg text-center hover:shadow-lg transition duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add Expense</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Quickly add a new expense</p>
        </Link>
        
        <Link
          to="/reports"
          className={`p-6 rounded-lg text-center hover:shadow-lg transition duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
        >
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>View Reports</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Analyze your spending</p>
        </Link>
        
        <Link
          to="/settings"
          className={`p-6 rounded-lg text-center hover:shadow-lg transition duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
        >
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Manage your account</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;