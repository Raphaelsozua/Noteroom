const db = require('./connection/mysql_connection');

function createUsersTable() {
	const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        phone VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
    )`;

	db.query(sql, (err, result) => {
		if (err) {
			console.error('Erro ao criar a tabela de usuários:', err);
		} else {
			console.log('Tabela de usuários verificada/criada com sucesso');
		}
	});
}

module.exports = createUsersTable;
