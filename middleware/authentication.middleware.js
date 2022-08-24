const JWT = require('../utils/JsonWebToken');
const UserModel = require('../models/user.model');


async function isAuthenticated(cookieToken) {
    if (!cookieToken) {
        return false;
    };
    var user = JWT.verify(cookieToken);
    if (!user) {
        return false;
    }
    user = await UserModel.findOne({
        username: user.username
    });
    if (!user) {
        return false;
    }
    return user;
}

async function authenticated(req, res, next) {
    var user = await isAuthenticated(req.cookies.token);
    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    req.user = user;
    next();
}

async function notAuthenticated(req, res, next) {
    var user = await isAuthenticated(req.cookies.token);

    //if user login is more than 20 minutes ago, then logout
    if (user && user.lastLogin && Date.now() - user.lastLogin > 1000 * 60 * 20) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        next();
    }
}

module.exports = {
    Authenticated: authenticated,
    NotAuthenticated: notAuthenticated
};