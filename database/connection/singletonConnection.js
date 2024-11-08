const mysql = require('mysql2');

class DatabaseConnection {
    constructor() {
        if (!DatabaseConnection.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                database: 'noteroom'
            });

            this.connection.connect(err => {
                if (err) {
                    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
                    return;
                }
                console.log('Conectado ao banco de dados como ID ' + this.connection.threadId);
            });

            DatabaseConnection.instance = this;
        }
        return DatabaseConnection.instance;
    }

    getConnection() {
        return this.connection;
    }
}

// Congela a instância para impedir novas modificações
const instance = new DatabaseConnection();
Object.freeze(instance);

module.exports = instance.getConnection();
