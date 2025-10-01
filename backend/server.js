const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Trust proxy - CRITICAL for Render.com
app.set('trust proxy', 1);

// Force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://expensesmanager-com.vercel.app'
  ],
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
  res.json({ 
    message: 'Expense Tracker API is running',
    environment: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL,
    protocol: req.protocol,
    secure: req.secure,
    host: req.get('host')
  });
});

// OAuth configuration debug endpoint
app.get('/api/debug-oauth', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Missing',
    clientUrl: process.env.CLIENT_URL,
    requestProtocol: req.protocol,
    requestSecure: req.secure,
    requestHost: req.get('host'),
    requestHeaders: {
      'x-forwarded-proto': req.headers['x-forwarded-proto'],
      'x-forwarded-host': req.headers['x-forwarded-host']
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL}`);
  console.log(`🔐 Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured'}`);
});