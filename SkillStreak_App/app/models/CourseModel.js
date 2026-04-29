const db = require('../../db');

class courseModel {
    async getAllCourses(filters = {}) {
        let query = 'SELECT * FROM courses WHERE 1=1';
        let params = [];
        
        if (filters.search) {
            query += ' AND (course_title LIKE ? OR course_description LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }
        
        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }
        
        const [courses] = await db.execute(query, params);
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
