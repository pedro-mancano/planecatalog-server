const Joi = require('joi');

const LoginValidation = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().required(),
}).options({
    stripUnknown: true,
    messages: {
        'any.required': '{#label} is required'
    }
});

module.exports = {
    LoginValidation,
}