const db = require('../../db');

class LoginModel {
    async getUserByEmail(email) {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return users.length > 0 ? users[0] : null;
    }
}

module.exports = new LoginModel();
