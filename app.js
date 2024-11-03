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

app.post('/users', async (req, res) => {
    try {
        const result = await ApiFacade.registerUser(req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const token = await ApiFacade.loginUser(req.body);
        res.status(200).send({ auth: true, token });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

app.post('/subjects', verifyToken, async (req, res) => {
    try {
        const result = await ApiFacade.createSubject(req.body, req.userId);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(5589, () => {
    console.log('Servidor rodando');
});
