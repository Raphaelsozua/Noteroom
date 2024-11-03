const db = require('../database/connection/mysql_connection');
const bcrypt = require('bcryptjs');

class UserService {
    async createUser(name, phone, email, password) {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const sql = `INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.query(sql, [name, phone, email, hashedPassword], (err, result) => {
                if (err) return reject('Erro ao cadastrar usuário');
                resolve('Usuário criado com sucesso');
            });
        });
    }

    async getUserByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [email], (err, result) => {
                if (err) return reject('Erro ao buscar usuário');
                resolve(result[0]);
            });
        });
    }
}

module.exports = new UserService();
