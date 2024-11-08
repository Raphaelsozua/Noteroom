const db = require('../database/connection/singletonConnection.js');

class SubjectService {
    async createSubject(name, description, color) {
        const sql = `INSERT INTO SchollSubject (name, description, color, user_id) VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [name, description, color], (err, result) => {
                if (err) return reject('Erro ao cadastrar matéria');
                resolve({
                    status: 201,
                    detail: 'Matéria criada com sucesso'
                });
            });
        });
    }

    async getSubjects(userID) {
        const sql = `SELECT * FROM SchollSubject WHERE user_id = ?`;
        
        return new Promise((resolve, reject) => {
            db.query(sql, [userID], (err, result) => {
                if (err) return reject({ status: 200, detail: 'Erro ao buscar matérias' });
                resolve(result);
            });
        });
    }

}

module.exports = new SubjectService();
