const db = require('../database/connection/mysql_connection');

class SubjectService {
    async createSubject(name, description, color, userId) {
        const sql = `INSERT INTO SchollSubject (name, description, color, user_id) VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [name, description, color, userId], (err, result) => {
                if (err) return reject('Erro ao cadastrar matéria');
                resolve('Matéria criada com sucesso');
            });
        });
    }
}

module.exports = new SubjectService();
