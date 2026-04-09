const courseModel = require('../models/courseModel');

class courseService {
    async getcourseData() {
        const courses = await courseModel.getAllCourses();
        const jobs = await courseModel.getAllJobs();
        return {
            title: 'Explore course | SkillStreak',
            courses,
            jobs
        };
    }
}

module.exports = new courseService();
