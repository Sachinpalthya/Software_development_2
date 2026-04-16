const db = require('./db');
async function run() {
    try {
        await db.execute("UPDATE courses SET category = 'Technical' WHERE course_id IN (1, 2, 3, 4, 5)");
        await db.execute("UPDATE courses SET category = 'Business' WHERE course_id IN (6, 9, 10)");
        await db.execute("UPDATE courses SET category = 'Design' WHERE course_id IN (7)");
        await db.execute("UPDATE courses SET category = 'Soft Skills' WHERE course_id IN (8)");
        console.log('Data updated');
    } catch (e) {
        console.log(e.message);
    } finally {
        process.exit();
    }
}
run();
