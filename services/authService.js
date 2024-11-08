const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('./userService');
const SENHA_TOKEN = '186579';

class AuthService {
    async login(email, password) {
        const user = await UserService.getUserByEmail(email);
        
        if (!user) throw new Error('Usuário não encontrado');

        const passwordIsValid = bcrypt.compareSync(password, user.user.password);
        
        if (!passwordIsValid) throw new Error('Senha inválida');

        const token = jwt.sign({ id: user.user.id }, SENHA_TOKEN, { expiresIn: 86400 });
        return token;
    }
}

module.exports = new AuthService();
