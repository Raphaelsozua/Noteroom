const db = require('../database/connection/singletonConnection');

class NotebookService {
    async createNotebooks(name, content, subjectId) {
        const sql = `INSERT INTO Notebooks (name, content, subject_id) VALUES (?, ?, ?)`;
        if (!subjectId) {
            return {
                status: 'error',
                detail: 'Erro ao cadastrar caderno',
                error: 'subjectId não informado'
            }
        }

        return new Promise((resolve, reject) => {
            db.query(sql, [name, content, subjectId], (err, result) => {
                if (err) {
                    return reject({
                        status: 'error',
                        detail: 'Erro ao cadastrar caderno',
                        error: err.message
                    });
                }
                resolve({
                    status: 'success',
                    detail: 'Caderno criado com sucesso',
                    notebook: {
                        id: result.insertId,
                        name: name,
                        content: content,
                        subject_id: subjectId
                    }
                });
            });
        });
    }

    async getNotebooks(subjectId) {
        const sql = `SELECT * FROM Notebooks WHERE subject_id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [subjectId], (err, result) => {
                if (err) {
                    return reject({
                        status: 'error',
                        detail: 'Erro ao buscar cadernos',
                        error: err.message
                    });
                }
                resolve({
                    status: 'success',
                    detail: 'Cadernos encontrados com sucesso',
                    notebooks: result
                });
            });
        });
    }
}

module.exports = new NotebookService();
