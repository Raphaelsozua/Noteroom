const UserService = require('../services/userService');
const SubjectService = require('../services/subjectService');
const AuthService = require('../services/authService');
const NotebookService = require('../services/notebookService'); // Importação do NotebookService

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

    async createNotebook(name, content, subjectId) {
        return await NotebookService.createNotebooks(name, content, subjectId);
    }

    async getSubjectsByUserId(userId) {
        return await SubjectService.getSubjects(userId);
    }
}

module.exports = new ApiFacade();
