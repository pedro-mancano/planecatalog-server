const Validation = require('../validation/validation');

const Validations = {
    ["LoginValidation"]: Validation.AuthValidation.LoginValidation,
    ["PlaneQueryValidation"]: Validation.PlaneValidation.PlaneQueryValidation,
}

module.exports = (str) => async function (req, res, next) {
    var validate = Validations[str].validate(req.body, { abortEarly: false });
    if (validate.error) {
        return res.status(400).json({
            message: validate.error.details[0].message
        });
    }
    next();
}