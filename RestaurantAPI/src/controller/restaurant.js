import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';

export default({ config, db }) => {
	let api = Router();

	// CRUD =>  Create, Read, Update, Delete

	// Create - (v1 => version 1) '/v1/restaurant/add'
	api.post('/add', (req, res) => {
		console.log(req.body);
		let newRest = new Restaurant();
		newRest.name = req.body.name;

		newRest.save(err => {
			if (err) {
				// res.status(500).send(err);
				res.send(`Error on saving: ${err}`);
			}

			// res.status(200).json({ message: 'Restaurant saved successfully.'});
			res.json({ message: 'Restaurant saved successfully.'});
		});
	});

	// Read - '/vi/restaurant/'
	api.get('/', (req, res) => {
		Restaurant.find({
			// all if it is empty
		}, (err, restaurants) => {
			if (err) {
				res.state(500).send(err);
			}

			res.json(restaurants);
		});
	});

	// Read 1 - '/v1/restaurant/:id'
	api.get('/:id', (req, res) => {
		// Find a restaurant by Id
		Restaurant.findById(req.params.id, (err, restaurant) => {
			if (err) {
				res.status(500).send(err)
			}

			res.status(200).json(restaurant);
		});
	});

	// Update - '/v1/restaurant/:id'
	api.put('/:id', (req, res) => {
		Restaurant.findById(req.params.id, (err, restaurant) => {
			if (err) {
				res.status(500).send(err);
			}

			restaurant.name = req.body.name;
			restaurant.save(err => {
				if (err) {
					res.status(500).send(err);
				}

				res.status(200).json({ message: "Restaurant info updated."})
			});
		});
	});

	return api;
}