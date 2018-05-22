var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo-hell:hellMlab18@ds123770.mlab.com:23770/devschwarz20'); // No longer required: mongoose.connect('...', { useMongoClient: true })
// mongoose.connect('mongodb://yourMongoDBURIGoesHere');
// mongodb://<dbuser>:<dbpassword>@ds123770.mlab.com:23770/devschwarz20
