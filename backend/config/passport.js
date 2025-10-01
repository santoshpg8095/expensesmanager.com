const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Force HTTPS callback URL for production
const getCallbackURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://expensesmanager-com.onrender.com/api/auth/google/callback';
  }
  return 'http://localhost:5000/api/auth/google/callback';
};

const callbackURL = getCallbackURL();

console.log('🔐 Passport Configuration:');
console.log('   Environment:', process.env.NODE_ENV || 'development');
console.log('   Callback URL:', callbackURL);
console.log('   Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Loaded' : 'Missing');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL,
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('🔐 Google OAuth Profile Received:', profile.id);

    // Check if user already exists with this googleId
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      console.log('✅ Existing Google user found:', user.email);
      return done(null, user);
    }
    
    // Check if user exists with same email but different auth method
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      console.log('🔄 Linking Google account to existing user:', user.email);
      user.googleId = profile.id;
      user.authMethod = 'google';
      user.avatar = profile.photos[0].value;
      user.isVerified = true;
      await user.save();
    } else {
      // Create new user
      console.log('👤 Creating new Google user:', profile.emails[0].value);
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        authMethod: 'google',
        isVerified: true
      });
    }
    
    console.log('✅ Google OAuth successful for user:', user.email);
    return done(null, user);
  } catch (error) {
    console.error('❌ Google OAuth error:', error);
    return done(error, null);
  }
}));

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;