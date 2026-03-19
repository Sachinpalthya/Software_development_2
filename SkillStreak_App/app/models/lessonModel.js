const db = require('../../db');

class LessonModel {
    async getFirstLessonIdByCourse(courseId) {
        const [lessons] = await db.execute('SELECT lesson_id FROM lessons WHERE course_id = ? ORDER BY lesson_order LIMIT 1', [courseId]);
        return lessons.length > 0 ? lessons[0].lesson_id : null;
    }

    async getLessonById(lessonId) {
        const [lessons] = await db.execute(`
            SELECT l.*, c.course_title 
            FROM lessons l 
            JOIN courses c ON l.course_id = c.course_id 
            WHERE l.lesson_id = ?
        `, [lessonId]);
        return lessons.length > 0 ? lessons[0] : null;
    }

    async getCommentsByLessonId(lessonId) {
        const [comments] = await db.execute(`
            SELECT c.*, u.full_name 
            FROM comments c 
            LEFT JOIN users u ON c.user_id = u.user_id 
            WHERE c.lesson_id = ?
        `, [lessonId]);
        return comments;
    }

    async getLessonsByCourseId(courseId) {
        const [courseLessons] = await db.execute(`
            SELECT * FROM lessons WHERE course_id = ? ORDER BY lesson_order
        `, [courseId]);
        return courseLessons;
    }
}

module.exports = new LessonModel();
