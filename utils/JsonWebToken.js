const jwt = require('jsonwebtoken');

function sign(payload, options) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'RS256',
        ...options
    });
}

function verify(token, options) {
    return jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['RS256'],
        ...options,
    });
}

function decode(token) {
    return jwt.decode(token);
}

module.exports = {
    sign,
    verify,
    decode,
}