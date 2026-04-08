const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const loginModel = require('../models/loginModel');
const registerModel = require('../models/registerModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
    callbackURL: "/auth/google/callback"
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
