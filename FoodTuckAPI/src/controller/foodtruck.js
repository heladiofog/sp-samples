import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';

export default({ config, db }) => {
	let api = Router();

	// CRUD =>  Create, Read, Update, Delete

	// Create - (v1 => version 1) '/v1/foodtruck/add'
	api.post('/add', (req, res) => {
		console.log(`FoodTruck to be created: ${req.body}`);
		// Create the foodtruck
		let newFoodTruck = new FoodTruck();
		newFoodTruck.name = req.body.name;
		newFoodTruck.foodtype = req.body.foodtype;
		newFoodTruck.avgcost = req.body.avgcost;
		newFoodTruck.geometry = req.body.geometry;

		newFoodTruck.save(err => {
			if (err) {
				// res.status(500).send(err);
				res.send(`Error on saving: ${err}`);
			}

			// res.status(200).json({ message: 'FoodTruck saved successfully.'});
			res.json({ message: 'FoodTruck saved successfully!' });
		});
	});

	// Read - '/vi/foodtruck/'
	api.get('/', (req, res) => {
		FoodTruck.find({
			// all if it is empty
		}, (err, foodtrucks) => {
			if (err) {
				res.state(500).send(err);
			}

			res.status(200).json(foodtrucks);
		});
	});

	// Read 1 - '/v1/foodtruck/:id'
	api.get('/:id', (req, res) => {
		// Find a foodtruck by Id
		FoodTruck.findById(req.params.id, (err, foodtruck) => {
			if (err) {
				res.status(500).send(err)
			}

			res.status(200).json(foodtruck);
		});
	});

	// Update - '/v1/foodtruck/:id'
	api.put('/:id', (req, res) => {
		FoodTruck.findById(req.params.id, (err, foodtruck) => {
			if (err) {
				res.status(500).send(err);
			}

			foodtruck.name = req.body.name;
			foodtruck.save(err => {
				if (err) {
					res.status(500).send(err);
				}

				res.status(200).json({ message: "FoodTruck info updated."})
			});
		});
	});

	// Delete - '/v1/foodtruck/:id'
	api.delete('/:id', (req, res) => {
		FoodTruck.remove({
			_id: req.params.id
		}, (err, foodtruck) => {
			if (err) {
				res.status(500).send(err);
			}

			res.status(200).json({ message: "FoodTruck susccessfully removed!" });
		});
	});

	// add a review for a specific foodtruck id
	// Add review: '/v1/foodtruck/reviews/add/:id'
	api.post('/reviews/add/:id', (req, res) => {
		// Look for the Foodtruck first
		FoodTruck.findById(req.params.id, (err, foodtruck) => {
			if (err) {
				res.status(500).send(err);	
			}

			// Create the review and nind it to the foodtruck
			let newReview = new Review();

			newReview.title = req.body.title;
			newReview.text = req.body.text;
			newReview.foodtruck = foodtruck._id;

			newReview.save((err, review) => {
				if (err) {
					res.status(500).send(err);	
				}

				// Bind the review
				foodtruck.reviews.push(newReview);
				foodtruck.save((err) => {
					if (err) {
						res.status(500).send(err);	

					}

					res.status(200).json({ message: 'Food Truck review saved!' });	
				});
			});
		});
	});

	// Get reviews for a specific foodtruck
	// READ '/v1/foodtruck/reviews/:id'
	api.get('/reviews/:id', (req, res) => {
		console.log(`Looking for foodtruck reviews. id: ${req.params.id}`);

		Review.find({ foodtruck: req.params.id }, (err, reviews) => {
			if (err) {
				res.status(500).send(err);
			}

			res.status(200).json(reviews);
		});
	});

	

	return api;
}
