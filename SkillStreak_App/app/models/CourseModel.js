const db = require('../../db');

class courseModel {
    async getAllCourses() {
        const [courses] = await db.execute('SELECT * FROM courses');
        return courses;
    }

    async getAllJobs() {
        const [jobs] = await db.execute(`
            SELECT j.*, c.course_title 
            FROM jobs j
            LEFT JOIN courses c ON j.related_course = c.course_id
            ORDER BY j.posted_at DESC
        `);
        return jobs;
    }
}

module.exports = new courseModel();
