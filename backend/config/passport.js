const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Debug: Check if environment variables are loaded
console.log('Passport Config: Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Loaded' : 'Missing');
console.log('Passport Config: Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Loaded' : 'Missing');

// Validate required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ Missing Google OAuth environment variables!');
  console.error('Please check your .env file and ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set.');
} else {
  console.log('✅ Google OAuth environment variables are configured');
}

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('🔐 Google OAuth Profile Received:', {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    });

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
      // Link Google account to existing user
      user.googleId = profile.id;
      user.authMethod = 'google';
      user.avatar = profile.photos[0].value;
      user.isVerified = true; // Google emails are verified
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
        isVerified: true // Google emails are verified
      });
    }
    
    console.log('✅ Google OAuth successful for user:', user.email);
    return done(null, user);
  } catch (error) {
    console.error('❌ Google OAuth error:', error);
    return done(error, null);
  }
}));

// JWT Strategy for protecting routes
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
    console.error('❌ JWT Strategy error:', error);
    return done(error, false);
  }
}));

// Serialize user (not used for JWT but required by Passport)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (not used for JWT but required by Passport)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

console.log('✅ Passport strategies configured successfully');

module.exports = passport;