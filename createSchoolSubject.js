const connection = require('./banco');

const createSchoolSubjectTable = `
CREATE TABLE SchollSubject (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    color VARCHAR(7),
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`;


function createTable() {
  connection.query(createSchoolSubjectTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela "SchollSubject":', err);
    } else {
      console.log('Tabela "SchollSubject" criada com sucesso ou já existe.');
    }
  });
}


module.exports = createTable;
