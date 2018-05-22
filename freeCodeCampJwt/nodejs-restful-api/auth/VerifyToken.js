// Middleware fucntion to:
// 1. check if a middleware exists
// 2. validate whether the Token is valid
var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    // console.log('Middleware');

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.'});
    }

    jwt.verify(token, config.secret, function(err, user) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
        }
        // If everything it's ok
        req.userId = user.id;
        next();
    });
}

module.exports = verifyToken;