import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
// import mongoose 	from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;	// is what passport uses

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
// For parse application/json in a request on the middleware
app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// passport config
app.use(passport.initialize());
let Account = require('./model/account');
// Passport serializes and deserializes a user when they try to log in
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// api routes v1
app.use('/v1', routes);

// Start the server
app.server.listen(config.port);
console.log(`Started on port on ${app.server.address().port}`);

export default app;
