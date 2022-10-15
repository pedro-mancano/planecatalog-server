const Joi = require('joi');
const planeParams = require('../assets/planeParameters.json').parameters;
const planeParamsNames = planeParams.map(param => param.name);

const QueryValidation = Joi.object({
    filter: Joi.array().items(
        Joi.object({
            field: Joi.string().required().valid(...planeParamsNames),
            type: Joi.string().required(),
            value: Joi.object().required()
        }).optional()
    ).min(0).default([]),
    skip: Joi.number().integer().min(0).default(0),
}).options({
    stripUnknown: true,
    messages: {
        'any.required': '{#label} is required'
    }
});

const AllValidation = Joi.object({
    skip: Joi.number().integer().min(0).default(0),
}).options({
    stripUnknown: true,
    messages: {
        'any.required': '{#label} is required'
    }
});

module.exports = {
    QueryValidation,
    AllValidation
}