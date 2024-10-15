const jwt = require('jsonwebtoken');

const SENHA_TOKEN = '186579';

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token necessário');
    tokenReplaced = token.split(' ')[1]

    jwt.verify(tokenReplaced, SENHA_TOKEN, (err, decoded) => {
        
        console.log(tokenReplaced)
        if (err) return res.status(500).send('Não foi possível obter o token');
        req.userId = decoded.id;
        next();
    });
}
module.exports = verifyToken;