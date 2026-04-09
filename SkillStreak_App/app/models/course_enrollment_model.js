const db = require('../../db');

class CourseEnrollmentModel {
    async getUserEnrollments(userId) {
        const query = `
            SELECT c.course_id, c.course_title, c.course_description, c.course_level, e.enrollment_date 
            FROM enrollments e
            JOIN courses c ON e.course_id = c.course_id
            WHERE e.user_id = ?
        `;
        const [enrollments] = await db.execute(query, [userId]);
        return enrollments;
    }

    async checkEnrollment(userId, courseId) {
        const query = `SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?`;
        const [rows] = await db.execute(query, [userId, courseId]);
        return rows.length > 0;
    }

    async enrollUser(userId, courseId) {
        const query = `INSERT INTO enrollments (user_id, course_id, enrollment_date) VALUES (?, ?, CURDATE())`;
        const [result] = await db.execute(query, [userId, courseId]);
        return result.insertId;
    }
}

module.exports = new CourseEnrollmentModel();
