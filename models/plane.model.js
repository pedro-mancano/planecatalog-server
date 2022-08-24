const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaneScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    seatCount: {
        type: Number,
        required: false,
        default: 0
    },
    wingspan: {
        type: Number,
        required: false,
        default: 0
    },
    length: {
        type: Number,
        required: false,
        default: 0
    },
    cabinLength: {
        type: Number,
        required: false,
        default: 0
    },
    wingArea: {
        type: Number,
        required: false,
        default: 0
    },
    aspectRatio: {
        type: Number,
        required: false,
        default: 0
    },
    weightEmpty: {
        type: Number,
        required: false,
        default: 0
    },
    weightCargo: {
        type: Number,
        required: false,
        default: 0
    },
    weightWingCargo: {
        type: Number,
        required: false,
        default: 0
    },
    horsepower: {
        type: Number,
        required: false,
        default: 0
    },
    VNE: {
        type: Number,
        required: false,
        default: 0
    },
    speedMax: {
        type: Number,
        required: false,
        default: 0
    },
    speedCruise: {
        type: Number,
        required: false,
        default: 0
    },
    speedStallNoFlap: {
        type: Number,
        required: false,
        default: 0
    },
    speedStallFlap: {
        type: Number,
        required: false,
        default: 0
    },
    rateOfClimb: {
        type: Number,
        required: false,
        default: 0
    },
    takeoffDistance: {
        type: Number,
        required: false,
        default: 0
    },
    range: {
        type: Number,
        required: false,
        default: 0
    },
    autonomy: {
        type: Number,
        required: false,
        default: 0
    },
    liftDragRatio: {
        type: Number,
        required: false,
        default: 0
    },
    motor: {
        type: String,
        required: false,
        default: ""
    },
}, {
    collection: "planes"
});

const PlaneModel = mongoose.model('Plane', PlaneScheme);


module.exports = PlaneModel;