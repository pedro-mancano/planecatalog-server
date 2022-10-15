module.exports = (validator) => async function (req, res, next) {
    var {
        error,
        value
    } = validator.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    req.body = value;
    next();
}