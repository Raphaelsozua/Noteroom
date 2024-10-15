
const connection = require('./connection/connection');

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );
`;


function createTable() {
  connection.query(createUsersTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela "users":', err);
    } else {
      console.log('Tabela "users" criada com sucesso ou já existe.');
    }
  });
}


module.exports = createTable;
