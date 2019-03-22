var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
  make: String,
  model: String,
  color: String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

/*
ES6
import { Schema as _Schema, model as _model } from 'mongoose';
var Schema = _Schema;

var VehicleSchema = new Schema({
    make: String,
    model: String,
    color: String
});

export default _model('Vehicle', VehicleSchema);
*/