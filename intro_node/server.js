// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// models
var VehicleModel = require('./app/models/vehicle');

// application server
let app = express();

// Configure app for body-parser
// let is grab data from the body of POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up port for server to listen on
let port = process.env.NODE_PORT || 3000;    // NODE_PORT=5000 on local SO env

// Connect to our database
mongoose.connect('mongodb://localhost:27017/spCodealong',
  {
    useNewUrlParser: true
  }
);

// API routes
let router = express.Router();

// Routes will all be prefixed with '/api/v1'
app.use('/api/v1', router);

// Middleware
// It can be very useful for doing validations, or make log
// thinngs from here or stop the request from continuing in
// the event that the request is not safe.
// Middleware to use for all requests
router.use(function (req, res, next) {
  console.log('FYI...There is some processing currently going down...');
  // The very last thing it does is to call next...
  next();
});

// Test Route, since router has been set to /api/v1, the whole URI is:
// http://localhost:5000/api/v1
router.get('/', (req, res) => {
  console.log("Root path on http://localhost:5000/api/v1");
  res.status(200)
    .json({ message: 'Welcome to playground API.' });
})

// Routes enchained
router.route('/vehicles')
  // Creates a new vehicle
  // Test URL: http://localhost:5000/api/v1/vehicles/
  // The data goes through POST method
  .post(function (req, res) {
    var vehicle = new VehicleModel();   // new instance of a vehicle
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function (err, data) {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200)
        .json({ message: 'Vehicle susccessfully manufactured' });
    });
  })
  // Return all the vehicles
  // Test URL: http://localhost:5000/api/v1/vehicles/5b137960c202171e327490a8
  .get(function (req, res) {
    VehicleModel.find(function (err, vehicles) {
      if (err) {
        res.status(400).send(err);
      }

      res.status(200).json(vehicles);
    });
  });

// GEt vehicles by some filter
// Parameter notation with ":", use req.params
router.route('/vehicles/:vehicle_id')
  .get(function (req, res) {
    VehicleModel.findById(req.params.vehicle_id, function (err, vehicle) {
      if (err) {
        res.status(400).send(err);
      }

      res.status(200).json(vehicle);
    });
  });

router.route('/vehicles/make/:make')
  .get(function (req, res) {
    VehicleModel.find({ make: req.params.make }, function (err, vehicle) {
      if (err) {
        res.status(400).send(err);
      }

      res.status(200).json(vehicle);
    });
  });

router.route('/vehicles/color/:color')
  .get(function (req, res) {
    VehicleModel.find({ color: req.params.color }, function (err, vehicle) {
      if (err) {
        res.status(400).send(err);
      }

      res.status(200).json(vehicle);
    });
  });

// Fire up server
app.listen(port);
// Print a message to console when the server fires up
console.log('Server listening on port : ' + port);
