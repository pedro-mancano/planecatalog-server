const router = require('express').Router();
const Validator = require('../middleware/validation.middleware');
const PlaneController = require('../controller/Plane.controller');

router.post('/all', Validator("PlaneAllValidation"), PlaneController.queryAllPlanes)

router.post('/query', Validator("PlaneQueryValidation"), PlaneController.queryPlaneUsingFilter);

module.exports = router;