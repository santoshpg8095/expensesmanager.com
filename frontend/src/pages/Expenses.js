import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { useExpense } from '../context/ExpenseContext';

const Expenses = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { expenses, getExpenses, addExpense, updateExpense, deleteExpense, loading } = useExpense();

  useEffect(() => {
    getExpenses(currentPage);
  }, [currentPage]);

  const handleAddExpense = async (expenseData) => {
    await addExpense(expenseData);
    setShowForm(false);
    getExpenses(currentPage);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleUpdateExpense = async (expenseData) => {
    await updateExpense(editingExpense._id, expenseData);
    setShowForm(false);
    setEditingExpense(null);
    getExpenses(currentPage);
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
      getExpenses(currentPage);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
          <p className="text-gray-600">Manage your expenses</p>
        </div>
        
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8">
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            initialData={editingExpense}
            buttonText={editingExpense ? 'Update Expense' : 'Add Expense'}
          />
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Cancel
          </button>
        </div>
      )}

      <ExpenseTable
        expenses={expenses}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Expenses;