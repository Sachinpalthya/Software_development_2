require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
require('./config/passport'); // Load Passport configuration

const routes = require('../routes');
const db = require('../db'); // Initializes MySQL connection to skill_platform on startup

const app = express();
const PORT = process.env.PORT || 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../static')));

// Parse JSON and URL-encoded bodies for form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Set the sessions
const session = require('express-session');
app.use(session({
    secret: 'secretkeysdfjsflyoifasd',
    resave: false,
    saveUninitialized: true,
    rolling: true, // Resets the expiration on every response
    cookie: { 
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 24 hours in milliseconds
    }
}));

// Access session data in all Pug templates statically
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Routing
app.use('/', routes);

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
    console.log(`SkillStreak server running on http://localhost:${PORT}`);
});
