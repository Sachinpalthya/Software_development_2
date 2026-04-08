const db = require('../../db');

class courseModel {
    async getAllCourses() {
        const [courses] = await db.execute('SELECT * FROM courses');
        return courses;
    }
}

module.exports = new courseModel();
