const router = require('express').Router();
const Validator = require('../middleware/validation.middleware');
const UserModel = require('../models/user.model');
const AuthController = require('../controller/Auth.controller');
const Authenticator = require('../middleware/authentication.middleware');

router.post('/login', Validator('LoginValidation'), Authenticator.NotAuthenticated, async (req, res) => {
    //let user = await UserModel.byUsername(req.body.username);
    //
    //user = await AuthController.authenticateUser(user, req.body.username, req.body.password);
    //
    //if (!user) {
    //    return res.status(401).json({
    //        message: 'Unauthorized'
    //    });
    //}
    //
    //const token = user.generateJWT();
    //return res.cookie('token', token, {
    //    httpOnly: true,
    //    maxAge: 1000 * 60 * 60 * 24 * 7,
    //    sameSite: 'none',
    //    secure: true,
    //}).status(200).json({
    //    user: user.unesp
    //});
});

module.exports = router;