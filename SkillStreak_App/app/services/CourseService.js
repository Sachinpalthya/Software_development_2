const courseModel = require('../models/courseModel');

class courseService {
    async getcourseData() {
        const courses = await courseModel.getAllCourses();
        return {
            title: 'Explore course | SkillStreak',
            courses
        };
    }
}

module.exports = new courseService();
