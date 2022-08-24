const router = require('express').Router();
const Validator = require('../middleware/validation.middleware');
const UserModel = require('../models/user.model');
const Authenticator = require('../middleware/authentication.middleware');
const AuthController = require('../controller/Auth.controller');

router.get('/grades', Authenticator.Authenticated, async (req, res) => {

});

router.get('/schedule', Authenticator.Authenticated, async (req, res) => {

});

module.exports = router;