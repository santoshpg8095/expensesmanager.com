import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, initialData, buttonText = 'Add Expense' }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: initialData.amount || '',
        category: initialData.category || 'Food',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="title">
          Title *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="title"
          name="title"
          type="text"
          placeholder="Enter expense title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
          Amount (₹) * {/* Changed from $ to ₹ */}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="category">
          Category *
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="date">
          Date *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
          id="description"
          name="description"
          rows="3"
          placeholder="Enter expense description (optional)"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;