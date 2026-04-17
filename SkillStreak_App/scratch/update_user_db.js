const pool = require('../db/index.js');
(async () => {
    try {
        await pool.query('ALTER TABLE users ADD COLUMN profile_photo VARCHAR(255) DEFAULT NULL');
        console.log('Added profile_photo');
    } catch (e) {
        console.log('profile_photo exists or err:', e.message);
    }
    try {
        await pool.query("ALTER TABLE users ADD COLUMN gender ENUM('male', 'female', 'other') DEFAULT 'other'");
        console.log('Added gender');
    } catch (e) {
        console.log('gender exists or err:', e.message);
    }
    try {
        await pool.query('ALTER TABLE users ADD COLUMN bio TEXT DEFAULT NULL');
        console.log('Added bio');
    } catch (e) {
        console.log('bio exists or err:', e.message);
    }
    process.exit(0);
})();
