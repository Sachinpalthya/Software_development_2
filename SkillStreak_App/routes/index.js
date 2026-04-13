const express = require('express');
const router = express.Router();

const indexService = require('../app/services/indexService');
const registerService = require('../app/services/registerService');
const loginService = require('../app/services/loginService');
const courseService = require('../app/services/courseService');
const lessonService = require('../app/services/lessonService');
const profileService = require('../app/services/profileservice');
const certificateService = require('../app/services/certificateservice');
const enrollmentService = require('../app/services/course_enrollment_service');
const contestService = require('../app/services/contestService');
const leaderboardService = require('../app/services/leaderboardService');

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

// Contest Page
router.get('/contest', async (req, res) => {
    try {
        const data = await contestService.getContestData();
        res.render('contest', data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error loading contest page');
    }
});

// Submit Contest Result
router.post('/contest/submit', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    try {
        const userId = req.session.user.user_id || req.session.user.id;
        const { contestId } = req.body;
        
        await contestService.submitContest(userId, contestId);
        res.json({ success: true, message: 'Solution submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during submission' });
    }
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

// Leaderboard Page
router.get('/leaderboard', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const userId = req.session.user.user_id || req.session.user.id || 1;
        const data = await leaderboardService.getLeaderboardData(userId);
        res.render('leaderboard', data);
    } catch (error) {
        console.error("Error generating leaderboard:", error);
        res.status(500).send('Server Error');
    }
});

// Enrollments Page
router.get('/enrollments', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const userId = req.session.user.user_id || req.session.user.id || 1;
        const data = await enrollmentService.getEnrollmentData(userId);
        res.render('course_enrollement', data);
    } catch (error) {
        console.error("Error generating enrollments:", error);
        res.status(500).send('Server Error');
    }
});

// Enroll in a Course route
router.post('/enroll/:courseId', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const userId = req.session.user.user_id || req.session.user.id || 1;
        await enrollmentService.enrollInCourse(userId, req.params.courseId);
        res.redirect('/profile');
    } catch (error) {
        console.error("Error enrolling in course:", error);
        res.redirect('/course?error=enrollment');
    }
});

module.exports = router;
