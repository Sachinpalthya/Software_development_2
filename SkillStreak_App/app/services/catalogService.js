const catalogModel = require('../models/catalogModel');

class CatalogService {
    async getCatalogData() {
        const courses = await catalogModel.getAllCourses();
        return {
            title: 'Explore Catalog | SkillStreak',
            courses
        };
    }
}

module.exports = new CatalogService();
