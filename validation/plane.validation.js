const Joi = require('joi');

const PlaneQueryValidation = Joi.object({
    filter: Joi.string().email().required(),
}).options({
    stripUnknown: true,
    messages: {
        'any.required': '{#label} is required'
    }
});

module.exports = {
    PlaneQueryValidation
}