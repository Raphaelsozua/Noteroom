const db = require('./connection/mysql_connection');

function createTableSubject() {
	const sql = `CREATE TABLE IF NOT EXISTS Notebooks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        content MEDIUMTEXT,        
        subject_id INT,
        FOREIGN KEY (subject_id) REFERENCES schollSubject(id)
    )`;

	db.query(sql, (err, result) => {
		if (err) {
			console.error('Erro ao criar a tabela de cadernos:', err);
		} else {
			console.log('Tabela de cadernos verificada/criada com sucesso');
		}
	});
}

module.exports = createTableSubject;
