import React, { useState } from 'react';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';

const ExpenseTable = ({ expenses, onEdit, onDelete, currentPage, totalPages, onPageChange }) => {
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const { darkMode } = useTheme();

  if (expenses.length === 0) {
    return (
      <div className={`p-8 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <p className="text-gray-600">No expenses found. Add your first expense to get started!</p>
      </div>
    );
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortField === 'amount') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={`overflow-x-auto rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('title')}
            >
              Title {getSortIcon('title')}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('amount')}
            >
              Amount {getSortIcon('amount')}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('category')}
            >
              Category {getSortIcon('category')}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('date')}
            >
              Date {getSortIcon('date')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Description
            </th>
            {onEdit && onDelete && (
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
          {sortedExpenses.map((expense) => (
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
                {format(new Date(expense.date), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4 text-sm">
                {expense.description || '-'}
              </td>
              {onEdit && onDelete && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(expense)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;