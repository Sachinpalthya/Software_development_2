const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

// Google Auth Placeholder
router.get('/auth/google', (req, res) => {
    res.render('register', { title: 'Create Account | SkillStreak', showNavbar: false, showFooter: false, error: 'Google Sign In is not set up yet. Please use standard registration.' });
});

// Home Page
router.get('/', (req, res) => {
    res.render('index', { title: 'Home | SkillStreak' });
});

// Registration Page (Frontend)
router.get('/register', (req, res) => {
    res.render('register', { title: 'Create Account | SkillStreak', showNavbar: false, showFooter: false });
});

// Registration Processing (Backend)
router.post('/register', async (req, res) => {
    const { role, full_name, email, password, password_confirm } = req.body;
    
    if (password !== password_confirm) {
        return res.render('register', { title: 'Create Account | SkillStreak', showNavbar: false, showFooter: false, error: 'Passwords do not match.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
            [full_name, email, hashedPassword, role]
        );
        
        req.session.user = {
            id: result.insertId,
            name: full_name,
            email: email,
            role: role
        };
        
        res.redirect('/catalog'); // Redirect to courses after successful registration
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
           return res.render('register', { title: 'Create Account | SkillStreak', showNavbar: false, showFooter: false, error: 'An account with this email already exists.' });
        }
        res.render('register', { title: 'Create Account | SkillStreak', showNavbar: false, showFooter: false, error: 'Registration failed. Please try again.' });
    }
});

// Login Page (Frontend)
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login | SkillStreak', showNavbar: false, showFooter: false });
});

// Login Processing (Backend)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.render('login', { title: 'Login | SkillStreak', showNavbar: false, showFooter: false, error: 'Invalid email or password.' });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render('login', { title: 'Login | SkillStreak', showNavbar: false, showFooter: false, error: 'Invalid email or password.' });
        }

        // Save session on successful authentication
        req.session.user = {
            id: user.user_id,
            name: user.full_name,
            email: user.email,
            role: user.role
        };

        res.redirect('/catalog');
    } catch (error) {
        console.error(error);
        res.render('login', { title: 'Login | SkillStreak', showNavbar: false, showFooter: false, error: 'Login completely failed. Please try again.' });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error("Error destroying session:", err);
        res.redirect('/');
    });
});

// Course Catalog Page
router.get('/catalog', (req, res) => {
    res.render('catalog', { title: 'Explore Catalog | SkillStreak' });
});

// Lesson View Page
router.get('/lesson', (req, res) => {
    res.render('lesson', { title: 'Lesson View | SkillStreak', showFooter: false });
});

module.exports = router;
