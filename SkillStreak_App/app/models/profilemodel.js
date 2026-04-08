const db = require('../../db');

class ProfileModel {
    static async getUserStats(userId) {
        const query = `
            SELECT u.full_name, u.role, 
                   IFNULL(l.total_score, 0) as xp, 
                   IFNULL(l.rank_position, 114) as rank,
                   IFNULL(s.current_streak, 0) as streak
            FROM users u
            LEFT JOIN leaderboard l ON u.user_id = l.user_id
            LEFT JOIN streaks s ON u.user_id = s.user_id
            WHERE u.user_id = ?
        `;
        const [rows] = await db.query(query, [userId]);
        return rows[0];
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
