const PlaneModel = require('../models/Plane.model');


async function searchPlane(query, limit, skip) {
  return (await PlaneModel.find(query).limit(limit).skip(skip).lean()).map(plane => {
    delete plane._id;
    return plane;
  });
}

async function countPlanes(query) {
  return await PlaneModel.countDocuments(query);
}

module.exports = {
  searchPlane,
  countPlanes,
};