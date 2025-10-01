const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Initialize Passport
const passport = require('./config/passport');
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Expense Tracker API' });
});

// Test route for Google OAuth configuration
app.get('/api/test-oauth', (req, res) => {
  res.json({
    message: 'OAuth test endpoint',
    googleConfigured: !!process.env.GOOGLE_CLIENT_ID,
    clientUrl: process.env.CLIENT_URL
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured'}`);
});