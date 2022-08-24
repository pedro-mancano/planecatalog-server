const Unesp = require('../utils/unesp.api');
const UserModel = require('../models/user.model');

async function authenticateUser(user, username, password) {

    if (!username, !password) {
        return null;
    }

    const unesp = new Unesp();
    const login = await unesp.loginChain(username, password);
    if (login instanceof Error) {
        return null;
    }
    if (!user) {
        const unespUser = await unesp.userInfo();
        user = new UserModel({
            username: username,
            password: password,
            unesp: {
                id: unespUser.idUsuario,
                name: unespUser.nome,
                email: unespUser.email,
                cpf: unespUser.cpf,
                identity: unespUser.identificacao,
                tokens: unesp.getAuth()
            },
            lastLogin: new Date()
        });
    } else {
        user.lastLogin = new Date();
        user.unesp.tokens = unesp.getAuth();
    }
    await user.save();

    return user;
}

module.exports = {
    authenticateUser
};