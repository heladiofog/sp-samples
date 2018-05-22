// AuthController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// User
var User = require('../user/User');
// Encryption
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Register endpoint
router.post('/register', function(req, res) {
    // encrypting password
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    },
    function(err, user) {
        if (err) {
            return res.status(500).send("There was a problem registering the user.");
        }
        // Successful register
        // create a token with the payload (id) and the secret Key
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400    // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
});

// Let’s write a piece of code to get the user id based on the token we got back from the register endpoint.
router.get('/me', function(req, res, next) {
    var token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401). // unauthorized
            send({ auth: false, message: 'No token provided.' });
    }
    // Token verification
    /* This method decodes the token making it possible to view the original payload. (the id)
        We’ll handle errors if there are any and if there are not, 
        send back the decoded value as the response.
    */
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(500).
                send({ auth: false, message: 'Failed to authenticate token.'});
        }
        // Returns the token decoded
        // res.status(200).send(decoded);
        // to Find user By id
        User.findById(decoded.id,
            { password: 0 },
            function (err, user) {
                if (!user) {
                    return res.status(404).send("No user found.");
                }
                // Return user found
                // res.status(200).send(user);
                next(user);
            }
        );
    });
});

// // Middleware function
// router.use(function(user, req, res, next) {
//     res.status(200).send(user);
// });

// Login
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        // Server error
        if (err) {
            return res.status(500).send('Error on the server.');
        }
        // User not found
        if (!user) {
            return res.status(404).send('No user was found.');
        }
        // User found
        var passwordIsVaid = bcrypt.compareSync(req.body.password, user.password);
        // Wrong password, unauthorized
        if (!passwordIsVaid) {
            return res.status(401).send({ auth: false, token: null });
        }
        // Login ok, generate and return token
        var token = jwt.sign(
            { id: user._id },
            config.secret,
            { expiresIn: 86400 }    // expires in 24 hours
        );

        res.status(200).send({ auth: true, token: token });
    });
});

// Logout by nullifying the token
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

// Middleware function
router.use(function(user, req, res, next) {
    res.status(200).send(user);
});

// export the router
module.exports = router;
