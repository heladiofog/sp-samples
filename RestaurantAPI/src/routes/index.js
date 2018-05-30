// Routes
import express 		from 'express';
// local objects
import config 		from '../config';
import middleware 	from '../middleware';
import initializeDb from '../db';	// To create the db connection
import restaurant	from '../controller/restaurant';

let router = express();

// connect it to the db, we pass a callback function
initializeDb(db => {

	// internal middleware
	router.use(middleware({ config, db }));

	// api router v1 (/v1)
	router.use('/restaurant', restaurant({ config, db}));
});

export default router;