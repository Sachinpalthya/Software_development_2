const bcrypt = require('bcryptjs');
const registerModel = require('../models/registerModel');

class RegisterService {
    async registerUser(fullName, email, password, passwordConfirm, role, gender) {
        if (password !== passwordConfirm) {
            throw new Error('Passwords do not match.');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await registerModel.createUser(fullName, email, hashedPassword, role, gender);
            
            return {
                id: result.insertId,
                name: fullName,
                email: email,
                role: role,
                gender: gender
            };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('An account with this email already exists.');
            }
            throw new Error('Registration failed. Please try again.');
        }
    }
}

module.exports = new RegisterService();
