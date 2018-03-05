// Routes
import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initi¡alizeDb from '../db';

let router = express();

// connect it to the db
initializeDb(db => {

	// internal middleware
	router.use(middleware({config, db}));

	// api rputer v1 (/v1)
})

export default router;