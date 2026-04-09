const enrollmentModel = require('../models/course_enrollment_model');

class CourseEnrollmentService {
    async getEnrollmentData(userId) {
        const enrolledCourses = await enrollmentModel.getUserEnrollments(userId);
        return {
            title: 'My Enrollments | SkillStreak',
            enrolledCourses
        };
    }

    async enrollInCourse(userId, courseId) {
        const isEnrolled = await enrollmentModel.checkEnrollment(userId, courseId);
        if (isEnrolled) {
            throw new Error('Already enrolled in this course');
        }
        await enrollmentModel.enrollUser(userId, courseId);
    }
}

module.exports = new CourseEnrollmentService();
