const express = require('express');
const path = require('path');
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

// Session Configuration
const session = require('express-session');
app.use(session({
    secret: 'skillstreak_super_secret_key', // In production, use environment variables
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 days
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
