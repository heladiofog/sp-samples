import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';

export default({ config, db }) => {
	let api = Router();

	// (v1 => version 1) '/v1/restaurant/add'
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

	return api;
}