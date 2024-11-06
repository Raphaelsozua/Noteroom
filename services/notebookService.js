const db = require('../database/connection/mysql_connection');

class NotebookService {
    async createNotebooks(name, content, subjectId) {
        const sql = `INSERT INTO Notebooks (name, content, subject_id) VALUES (?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [name, content, subjectId], (err, result) => {
                if (err) return reject('Erro ao cadastrar caderno');
                resolve('Caderno criado com sucesso');
            });
        });
    }

    async getNotebooks(subjectId) {
        const sql = `SELECT * FROM Notebooks WHERE subject_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [subjectId], (err, result) => {
                if (err) return reject('Erro ao buscar cadernos');
                resolve(result);
            });
        });
    }
}

module.exports = new NotebookService();
