import mongoose from 'mongoose';
let Schema = mongoose.Schema;	// The blueprint for the data model

let restaurantSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

