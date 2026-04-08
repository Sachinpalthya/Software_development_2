const express = require('express');
const router = express.Router();

const indexService = require('../app/services/indexService');
const registerService = require('../app/services/registerService');
const loginService = require('../app/services/loginService');
const courseService = require('../app/services/courseService');
const lessonService = require('../app/services/lessonService');
const profileService = require('../app/services/profileservice');
const certificateService = require('../app/services/certificateservice');

const passport = require('passport');

// Google Authentication Route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Authentication Callback
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        // Successful authentication
        req.session.user = req.user;
        res.redirect('/');
    }
);

// Home Page
router.get('/', (req, res) => {
    const data = indexService.getIndexData();
    res.render('index', data);
});

// Registration Page (Frontend)
router.get('/register', (req, res) => {
    res.render('register', { title: 'Create Account | SkillStreak', showNavbar: false, showFooter: false });
});

// Registration Processing (Backend)
router.post('/register', async (req, res) => {
    const { role, full_name, email, password, password_confirm } = req.body;
    
    try {
        const user = await registerService.registerUser(full_name, email, password, password_confirm, role);
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('register', { title: 'Create Account | SkillStreak', showNavbar: false, showFooter: false, error: error.message });
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
        const user = await loginService.authenticateUser(email, password);
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('login', { title: 'Login | SkillStreak', showNavbar: false, showFooter: false, error: error.message });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error("Error destroying session:", err);
        res.redirect('/');
    });
});

// Course course Page
router.get('/course', async (req, res) => {
    try {
        const data = await courseService.getcourseData();
        res.render('course', data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    }
});

// Redirect to first lesson of a course
router.get('/course/:id', async (req, res) => {
    try {
        const lessonId = await lessonService.getFirstLessonId(req.params.id);
        if (lessonId) {
            res.redirect(`/lesson/${lessonId}`);
        } else {
            res.status(404).send('No lessons found for this course.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    }
});

// Lesson View Page
router.get('/lesson/:id', async (req, res) => {
    try {
        const data = await lessonService.getLessonData(req.params.id);
        
        if (!data) {
            return res.status(404).send('Lesson not found');
        }

        res.render('lesson', data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    }
});

// Profile Page
router.get('/profile', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        // Fallback for user id property based on how it's stored in session
        const userId = req.session.user.user_id || req.session.user.id || 1;
        const data = await profileService.getProfileData(userId);
        res.render('profile', data);
    } catch (error) {
        console.error("Error generating profile:", error);
        res.status(500).send('Server Error');
    }
});

// Certificates Gallery Page
router.get('/certificates', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const userId = req.session.user.user_id || req.session.user.id || 1;
        const data = await certificateService.getCertificatesData(userId);
        res.render('certificates', data);
    } catch (error) {
        console.error("Error generating certificates gallery:", error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
