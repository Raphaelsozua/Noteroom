const db = require('../database/connection/singletonConnection.js');
const bcrypt = require('bcryptjs');

class UserService {
    async createUser(name, phone, email, password) {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const sql = `INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [name, phone, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar usuário:', err);
                    return reject({
                        status: 'error',
                        detail: 'Erro ao cadastrar usuário',
                        error: err
                    });
                }
                resolve({
                    status: 'success',
                    detail: 'Usuário criado com sucesso',
                    userId: result.insertId // Retorna o ID do novo usuário
                });
            });
        });
    }

    async getUserByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [email], (err, result) => {
                if (err) {
                    console.error('Erro ao buscar usuário:', err);
                    return reject({
                        status: 'error',
                        detail: 'Erro ao buscar usuário',
                        error: err
                    });
                }
                if (result.length === 0) {
                    return reject({
                        status: 'not_found',
                        detail: 'Usuário não encontrado'
                    });
                }
                resolve({
                    status: 'success',
                    detail: 'Usuário encontrado com sucesso',
                    user: result[0]
                });
            });
        });
    }
}

module.exports = new UserService();
