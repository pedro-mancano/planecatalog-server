const PlaneService = require('../services/Plane.service')


function filterParse(filter) {
    switch (filter.type) {
        case 'number_range':
            return { $gte: parseFloat(filter.value.min), $lte: parseFloat(filter.value.max) };
        case 'string':
            return { $regex: `${filter.value}`.toLocaleLowerCase(), $options: 'i' };
    }
}


async function queryAllPlanes(req, res) {
    const { skip } = req.body;

    const planes = await PlaneService.searchPlane({}, 10, skip);
    const count = await PlaneService.countPlanes({});

    res.json({
        planes: planes,
        count
    });
}

async function queryPlaneUsingFilter(req, res) {
    const { skip, filter } = req.body;

    const query = {};
    if (filter.length > 0) {
        filter.forEach(f => {
            query[f.field] = filterParse(f);
        });
    }

    const planes = await PlaneService.searchPlane(query, 20, skip);

    res.json(planes);
}

module.exports = {
    queryAllPlanes,
    queryPlaneUsingFilter
};