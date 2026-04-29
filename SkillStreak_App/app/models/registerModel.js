const db = require('../../db'); // Database connection

class RegisterModel {
    async createUser(fullName, email, hashedPassword, role, gender = 'other') {
        const [result] = await db.execute(
            'INSERT INTO users (full_name, email, password, role, gender) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, hashedPassword, role, gender]
        );
        return result;
    }
}

module.exports = new RegisterModel();
