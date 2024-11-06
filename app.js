const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const verifyToken = require('./middleware/verifyToken');
const ApiFacade = require('./facades/ApiFacade');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5589', credentials: true }));

// Rota para registro de usuários
app.post('/users', async (req, res) => {
    try {
        const result = await ApiFacade.registerUser(req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota para login de usuários
app.post('/login', async (req, res) => {
    try {
        const token = await ApiFacade.loginUser(req.body);
        res.status(200).send({ auth: true, token });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

// Rota para criação de matérias (requere autenticação)
app.post('/subjects', verifyToken, async (req, res) => {
    try {
        const result = await ApiFacade.createSubject(req.body, req.userId);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota para criação de cadernos (requere autenticação)
app.post('/notebooks', verifyToken, async (req, res) => {
    try {
        const { name, content, subjectId } = req.body; // Extraindo subjectId de req.body
        const result = await ApiFacade.createNotebook(name, content, subjectId);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Inicia o servidor
app.listen(5589, () => {
    console.log('Servidor rodando na porta 5589');
});
