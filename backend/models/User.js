const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  avatar: {
    type: String,
  },
  authMethod: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String,
  },
  resetPasswordOTP: String,
  resetPasswordOTPExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isVerified: {
    type: Boolean,
    default: false
  },
  currency: {
    type: String,
    default: 'USD'
  },
  monthlyBudget: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

// Hash password only for local auth and when password is modified
userSchema.pre('save', async function(next) {
  // Only hash password for local authentication and when password is modified
  if (this.authMethod !== 'local' || !this.isModified('password')) {
    return next();
  }
  
  // Only hash if password exists (Google users won't have passwords)
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Match password only for local auth users
userSchema.methods.matchPassword = async function(enteredPassword) {
  // Google auth users don't have passwords to compare
  if (this.authMethod !== 'local') {
    return false;
  }
  
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);