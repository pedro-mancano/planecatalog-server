const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const keys = {
    privateKey: fs.readFileSync(path.join(__dirname, '..', 'keys', 'private.key')),
    publicKey: fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key')),
}

function sign(payload, options) {
    return jwt.sign(payload, keys.privateKey, {
        algorithm: 'RS256',
        ...options,
    });
}

function verify(token, options) {
    return jwt.verify(token, keys.publicKey, {
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