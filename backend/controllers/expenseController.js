const Expense = require('../models/Expense');

// Get all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Expense.countDocuments({ user: req.user.id });
    
    res.json({
      expenses,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalExpenses: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expense by ID
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Check if user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
    
    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date: date || Date.now(),
      description,
    });
    
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Check if user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    // Check if user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await Expense.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expense summary
exports.getExpenseSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);
    
    const totalExpenses = await Expense.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    
    res.json({
      byCategory: summary,
      total: totalExpenses.length > 0 ? totalExpenses[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};