const bcrypt = require('bcryptjs');
const loginModel = require('../models/loginModel');

class LoginService {
    async authenticateUser(email, password) {
        const user = await loginModel.getUserByEmail(email);
        
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Invalid email or password.');
        }

        return {
            id: user.user_id,
            name: user.full_name,
            email: user.email,
            role: user.role
        };
    }
}

module.exports = new LoginService();
