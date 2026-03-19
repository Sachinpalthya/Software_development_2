const db = require('../../db');

class CatalogModel {
    async getAllCourses() {
        const [courses] = await db.execute('SELECT * FROM courses');
        return courses;
    }
}

module.exports = new CatalogModel();
