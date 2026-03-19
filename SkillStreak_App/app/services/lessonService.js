const lessonModel = require('../models/lessonModel');

class LessonService {
    async getFirstLessonId(courseId) {
        return await lessonModel.getFirstLessonIdByCourse(courseId);
    }

    async getLessonData(lessonId) {
        const lesson = await lessonModel.getLessonById(lessonId);
        
        if (!lesson) {
            return null; // Lesson not found
        }

        const comments = await lessonModel.getCommentsByLessonId(lessonId);
        const courseLessons = await lessonModel.getLessonsByCourseId(lesson.course_id);

        return {
            title: `${lesson.lesson_title} | SkillStreak`,
            showFooter: false,
            lesson,
            comments,
            courseLessons
        };
    }
}

module.exports = new LessonService();
