import mongoose from 'mongoose';
import Review from './review';

let Schema = mongoose.Schema;	// The blueprint for the data model

let foodtruckSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	foodtype: {
		type: String,
		required: true
	},
	avgcost: Number,
	geometry: {
		type: { type: String, default: 'Point' },
		coordinates: [Number]
	},
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
	// A reference to the review
});

module.exports = mongoose.model('FoodTruck', foodtruckSchema);

