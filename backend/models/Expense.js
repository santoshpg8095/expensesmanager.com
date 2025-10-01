const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Other'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Expense', expenseSchema);