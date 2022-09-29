const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaneScheme = new Schema({
    "name": {
        "type": String,
        "required": true
    },
    "wingType": {
        "type": String,
        "required": true,
        "default": "unknown"
    },
    "seatCount": {
        "type": Number,
        "required": true,
        "default": 1
    },
    "wingspan": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "totalLength": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "height": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "wingArea": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "meanAerodynamicChord": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "aspectRatio": {
        "type": Number,
        "required": true,
        "default": 1
    },
    "maxCeiling": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "emptyWeight": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "maxWeight": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "maxWingWeight": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "maxCruiseSpeed": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "stallFlapsSpeed": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "stallNoFlapsSpeed": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "liters": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "autonomy": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "consumption": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "fuelName": {
        "type": String,
        "required": true,
        "default": "unknown"
    },
    "motor": {
        "type": String,
        "required": true,
        "default": "unknown"
    },
    "power": {
        "type": Number,
        "required": true,
        "default": 0
    },
    "landingGearType": {
        "type": String,
        "required": true,
        "default": "unknown"
    },
    "material": {
        "type": String,
        "required": true,
        "default": "unknown"
    }
}, {
    collection: "planes"
});

const PlaneModel = mongoose.model('Plane', PlaneScheme);


module.exports = PlaneModel;