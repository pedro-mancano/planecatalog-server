const router = require('express').Router();
const Validator = require('../middleware/validation.middleware');
const PlaneModel = require('../models/plane.model');

router.post('/query', Validator("PlaneQueryValidation"), async (req, res) => {
    const filter = req.body.filter;

    //const plane = new PlaneModel({
    //    name: filter,
    //});
    //
    //plane.save();

    const planes = await PlaneModel.find();
    res.json(planes);
});

module.exports = router;