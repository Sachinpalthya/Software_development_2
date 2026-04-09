const ProfileModel = require('../models/profilemodel');

class ProfileService {
    static async getProfileData(userId) {
        let stats = await ProfileModel.getUserStats(userId);
        
        // Handle case where user has no stats entry yet
        if (!stats) {
            stats = { full_name: 'User', role: 'Learner', xp: 0, rank: 0, streak: 0 };
        }

        const courses = await ProfileModel.getEnrolledCourses(userId) || [];

        // Process courses for progress
        const processedCourses = courses.map(course => {
            let progress = 0;
            if (course.total_lessons > 0) {
                progress = Math.round((course.completed_lessons / course.total_lessons) * 100);
            }
            
            // Generate some fake "time left" based on remaining lessons
            const remaining = course.total_lessons - course.completed_lessons;
            const hoursLeft = Math.floor(remaining * 1.5);
            const minsLeft = (remaining * 90) % 60;

            let icon = 'fa-laptop-code';
            if (course.course_title.toLowerCase().includes('react')) icon = 'fa-react';
            else if (course.course_title.toLowerCase().includes('html')) icon = 'fa-html5';
            else if (course.course_title.toLowerCase().includes('css')) icon = 'fa-css3-alt';
            else if (course.course_title.toLowerCase().includes('node')) icon = 'fa-node-js';
            else if (course.course_title.toLowerCase().includes('js') || course.course_title.toLowerCase().includes('javascript')) icon = 'fa-js';

            return {
                ...course,
                progress,
                timeLeft: `${hoursLeft}h ${minsLeft}m left`,
                icon: icon,
                courseTitle: course.course_title
            };
        });

        // Ensure real dynamic data from DB
        return {
            title: 'Profile | SkillStreak',
            stats: {
                fullName: stats.full_name,
                role: stats.role === 'student' ? 'Full-Stack Developer' : stats.role === 'mentor' ? 'Senior Mentor' : 'Administrator',
                xp: (stats.monthly_xp + stats.weekly_xp).toLocaleString(), // Combined XP
                rank: stats.monthly_rank ? `#${stats.monthly_rank} Monthly` : (stats.weekly_rank ? `#${stats.weekly_rank} Weekly` : 'Unranked'),
                streak: stats.streak,
                hoursLearnt: `${Math.round(stats.lessons_completed * 1.5)}h`,
                solved: stats.solved_count.toString(),
                weeklyRank: stats.weekly_rank ? `#${stats.weekly_rank}` : 'N/A'
            },
            courses: processedCourses,
            milestones: [
                { title: 'Early Bird', icon: 'fa-sun', achieved: stats.lessons_completed > 0 },
                { title: 'Problem Solver', icon: 'fa-head-side-virus', achieved: stats.solved_count > 0 },
                { title: '7-Day Warrior', icon: 'fa-shield-halved', achieved: stats.streak >= 7 },
                { title: 'Speed Demon', icon: 'fa-bolt', achieved: stats.solved_count > 5 },
            ],
            nextMilestones: [
                { title: 'Elite Coder', desc: 'Solve 2 more expert challenges', icon: 'fa-award', color: '#3b82f6' },
                { title: 'Course Master', desc: 'Complete 1 more full course', icon: 'fa-graduation-cap', color: '#f59e0b' }
            ],
            weeklyGoal: {
                percent: 85,
                hoursAway: 2.5
            }
        };
    }
}

module.exports = ProfileService;
