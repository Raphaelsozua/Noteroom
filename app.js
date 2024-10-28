const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const db = require('./database/connection/mysql_connection');

const createTable = require('./database/createTable');
const createTableSubject = require('./database/createSchoolSubject');
const verifyToken = require("./middleware/verifyToken");

const app = express();


app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5589', // ajuste isso conforme necessário
    credentials: true
}));


createTable();
createTableSubject();
const SENHA_TOKEN = '186579'; // Necessário para o login, deixar organizado de forma modular posteriormente


app.get('/test', (req, res) => {
    res.send("Deu bom")
});


app.post('/subjects', verifyToken, (req, res) => {
    const { name, description, color } = req.body;

    if (!name) {
        return res.status(400).send('O nome da matéria é obrigatório');
    }

    const sql = `INSERT INTO SchollSubject (name, description, color, user_id) VALUES (?, ?, ?, ?)`;

    db.query(sql, [name, description, color, req.userId], (err, result) => {
        if (err) return res.status(500).send('Erro ao cadastrar a matéria');
        res.status(201).send('Matéria criada com sucesso');
    });
});

app.post('/users', (req, res) => {
    const { name, phone, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = `INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, phone, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Erro ao cadastrar usuário');
        res.status(201).send('Usuário criado com sucesso');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar usuário');

        if (results.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send('Senha inválida');
        }

        const token = jwt.sign({ id: user.id }, SENHA_TOKEN, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
});

app.put('/users/:id', (req, res) => {
    const { name, phone, email, password } = req.body;
    const id = req.params.id;

    const sql = `UPDATE users SET name = ?, phone = ?, email = ?, password = ? WHERE id = ?`;
    db.query(sql, [name, phone, email, password, id], (err, result) => {
        if (err) return res.status(500).send('Erro ao atualizar usuário');
        res.status(200).send('Usuário atualizado com sucesso');
    });
});

app.listen(5589, () => {
    console.log('Servidor rodando ');
});
