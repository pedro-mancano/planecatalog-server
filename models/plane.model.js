const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaneScheme = new Schema({
    name: String,
    seatCount: Number,
    wingspan: Number,
    length: Number,
    cabinLength: Number,
    wingArea: Number,
    aspectRatio: Number,
    weightEmpty: Number,
    weightCargo: Number,
    weightWingCargo: Number,
    horsepower: Number,
    VNE: Number,
    speedMax: Number,
    speedCruise: Number,
    speedStallNoFlap: Number,
    speedStallFlap: Number,
    rateOfClimb: Number,
    takeoffDistance: Number,
    range: Number,
    autonomy: Number,
    liftDragRatio: Number,
    motor: String,
});

const PlaneModel = mongoose.model('Plane', PlaneScheme);


module.exports = PlaneModel;