const db = require('./connection/singletonConnection');

function createTableSubject() {
	const sql = `CREATE TABLE IF NOT EXISTS SchollSubject (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        color VARCHAR(255),
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

	db.query(sql, (err, result) => {
		if (err) {
			console.error('Erro ao criar a tabela de matérias:', err);
		} else {
			console.log('Tabela de matérias verificada/criada com sucesso');
		}
	});
}

module.exports = createTableSubject;
