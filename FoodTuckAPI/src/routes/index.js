// Routes
import express from 'express';
// local objects
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';	// To create the db connection
import foodtruck from '../controller/foodtruck';
import account from '../controller/account';


let router = express();

// connect it to the db, we pass a callback function
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api router v1 (/v1)
  router.use('/foodtruck', foodtruck({ config, db }));
  router.use('/account', account({ config, db }));
});

export default router;