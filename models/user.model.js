const mongoose = require('mongoose');
const jwt = require('../utils/JsonWebToken');

var Schema = mongoose.Schema;

var UserScheme = new Schema({
    username: String,
    password: String,
    unesp: {
        id: Number,
        identity: String,
        name: String,
        email: String,
        cpf: String,
        tokens: String
    },
    lastLogin: Date
});

UserScheme.statics.byUsername = function (username) {
    return this.findOne({
        username
    });
}

UserScheme.statics.authenticate = function (username, password) {
    return this.findOne({
        username,
        password
    });
}

UserScheme.methods.generateJWT = function () {
    return jwt.sign({
        username: this.username,
        created: Date.now()
    });
};

UserScheme.pre('save', function (next) {
    //var user = this;
    //if (user.isModified('password')) {
    //    bcrypt.genSalt(10, function (err, salt) {
    //        bcrypt.hash(user.password, salt, function (err, hash) {
    //            user.password = hash;
    //            next();
    //        });
    //    });
    //} else {
    //    next();
    //}
    next();
});

const UserModel = mongoose.model('User', UserScheme);


module.exports = UserModel;