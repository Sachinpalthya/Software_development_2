const db = require('../../db'); // Database connection

class RegisterModel {
    async createUser(fullName, email, hashedPassword, role) {
        const [result] = await db.execute(
            'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
            [fullName, email, hashedPassword, role]
        );
        return result;
    }
}

module.exports = new RegisterModel();
