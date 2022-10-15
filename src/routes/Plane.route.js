const router = require('express').Router();
const Validator = require('../middleware/Validation.middleware');
const PlaneController = require('../controllers/Plane.controller');
const PlaneValidation = require('../validations/Plane.validation');

router.post('/all', Validator(PlaneValidation.AllValidation), PlaneController.queryAllPlanes)
router.post('/query', Validator(PlaneValidation.QueryValidation), PlaneController.queryPlaneUsingFilter);

module.exports = router;