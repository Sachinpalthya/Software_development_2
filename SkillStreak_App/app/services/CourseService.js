const courseModel = require('../models/courseModel');

class courseService {
    async getcourseData(filters) {
        const courses = await courseModel.getAllCourses(filters);
        const jobs = await courseModel.getAllJobs();
        return {
            title: 'Explore course | SkillStreak',
            courses,
            jobs,
            currentSearch: filters.search,
            currentCategory: filters.category
        };
    }
}

module.exports = new courseService();
