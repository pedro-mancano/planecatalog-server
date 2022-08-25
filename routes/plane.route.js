const router = require('express').Router();
const Validator = require('../middleware/validation.middleware');
const PlaneModel = require('../models/plane.model');


function filterParse(filter) {
    switch (filter.type) {
        case 'number_range':
            return { $gte: parseFloat(filter.value.min), $lte: parseFloat(filter.value.max) };
        case 'string':
            return { $regex: `${filter.value}`.toLocaleLowerCase(), $options: 'i' };
    }
}

router.post('/query', Validator("PlaneQueryValidation"), async (req, res) => {
    const filter = req.body.filter;

    const query = {};
    if (filter.length > 0) {
        filter.forEach(f => {
            query[f.field] = filterParse(f);
        });
    }

    const planes = await PlaneModel.find(query).limit(20).skip(0).lean();

    const cleanPlanes = planes.map(plane => {
        delete plane._id;
        delete plane.__v;
        delete plane.createdAt;
        delete plane.updatedAt;
        return plane;
    });

    res.json(cleanPlanes);
});

module.exports = router;