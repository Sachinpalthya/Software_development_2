const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const loginModel = require('../models/loginModel');
const registerModel = require('../models/registerModel');

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback";

if (!googleClientID || !googleClientSecret || googleClientID === 'your_google_client_id' || googleClientSecret === 'your_google_client_secret') {
    throw new Error('Google OAuth credentials are missing or invalid. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.');
}

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        const email = profile.emails[0].value;
        const fullName = profile.displayName;
        
        let user = await loginModel.getUserByEmail(email);
        
        if (!user) {
            // Generate a secure random password since we use bcrypt for local login
            const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            
            // Create user
            const result = await registerModel.createUser(fullName, email, hashedPassword, 'student');
            
            user = {
                user_id: result.insertId,
                full_name: fullName,
                email: email,
                role: 'student'
            };
        }
        
        // Define session structure exactly like loginService.js
        const sessionUser = {
            id: user.user_id || user.id, 
            name: user.full_name,
            email: user.email,
            role: user.role
        };
        
        return cb(null, sessionUser);
    } catch (err) {
        return cb(err, null);
    }
  }
));
