const db = require('../../db');

class ProfileModel {
    static async getUserStats(userId) {
        const query = `
            SELECT u.full_name, u.role, u.profile_photo, u.gender, u.bio,
                   IFNULL((SELECT score FROM leaderboard WHERE user_id = u.user_id AND leaderboard_type = 'monthly_streak' LIMIT 1), 0) as monthly_xp, 
                   IFNULL((SELECT rank_position FROM leaderboard WHERE user_id = u.user_id AND leaderboard_type = 'monthly_streak' LIMIT 1), 114) as monthly_rank,
                   IFNULL((SELECT score FROM leaderboard WHERE user_id = u.user_id AND leaderboard_type = 'weekly_contest' LIMIT 1), 0) as weekly_xp, 
                   IFNULL((SELECT rank_position FROM leaderboard WHERE user_id = u.user_id AND leaderboard_type = 'weekly_contest' LIMIT 1), 0) as weekly_rank,
                   IFNULL(s.current_streak, 0) as streak,
                   (SELECT COUNT(*) FROM contest_participants WHERE user_id = u.user_id) as solved_count,
                   (SELECT COUNT(*) FROM reflections WHERE user_id = u.user_id) as lessons_completed
            FROM users u
            LEFT JOIN streaks s ON u.user_id = s.user_id
            WHERE u.user_id = ?
        `;
        const [rows] = await db.query(query, [userId]);
        return rows[0];
    }

    static async updateUserProfile(userId, { fullName, gender, bio, profilePhoto }) {
        let query = 'UPDATE users SET full_name = ?, gender = ?, bio = ?';
        let params = [fullName, gender, bio];

        if (profilePhoto !== undefined) {
            query += ', profile_photo = ?';
            params.push(profilePhoto);
        }

        query += ' WHERE user_id = ?';
        params.push(userId);

        await db.query(query, params);
    }

    static async getEnrolledCourses(userId) {
        const query = `
            SELECT c.course_id, c.course_title,
                   (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.course_id) as total_lessons,
                   (SELECT COUNT(DISTINCT r.lesson_id) FROM reflections r 
                    JOIN lessons l2 ON r.lesson_id = l2.lesson_id 
                    WHERE r.user_id = ? AND l2.course_id = c.course_id) as completed_lessons
            FROM courses c
            JOIN enrollments e ON c.course_id = e.course_id
            WHERE e.user_id = ?
        `;
        const [rows] = await db.query(query, [userId, userId]);
        return rows;
    }
}

module.exports = ProfileModel;
