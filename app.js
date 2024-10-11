const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./banco');  
const createTable = require('./createTable');  


const app = express();
app.use(bodyParser.json());
app.use(cors());

const SENHA_TOKEN = '186579'; 

createTable();


app.get('/test', (req, res) => {
    res.send('Rota de teste funcionando!');
});


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token necessário');

    jwt.verify(token, SENHA_TOKEN, (err, decoded) => {
        if (err) return res.status(500).send('Não foi possível obter o token');
        req.userId = decoded.id;
        next();
    });
}

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


app.listen(5589, () => {
    console.log('Servidor rodando ');
});