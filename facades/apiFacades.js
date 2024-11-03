const UserService = require('../services/userService');
const SubjectService = require('../services/subjectService');
const AuthService = require('../services/authService');

class ApiFacade {
    async registerUser(data) {
        const { name, phone, email, password } = data;
        return await UserService.createUser(name, phone, email, password);
    }

    async loginUser(data) {
        const { email, password } = data;
        return await AuthService.login(email, password);
    }

    async createSubject(data, userId) {
        const { name, description, color } = data;
        return await SubjectService.createSubject(name, description, color, userId);
    }
}

module.exports = new ApiFacade();
