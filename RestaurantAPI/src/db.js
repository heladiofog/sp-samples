// db
import mongoose from 'mongoose';
import config 	from './config';

export default callback => {
	// Connection using promises:
	console.log(config.mongoUrl, config.port);
	let db = mongoose.connect(config.mongoUrl)
		.then(
			() => { /** Ready to Use. The `mongoose.connect()` promise resolves to undefined. */ 
				console.log("Connection done!.");
			},
			err => { /** handle initial connection error */
				console.log("Error puercote.", err);
			}
		).catch(function (e) {
			console.log("catch error", e);
		});

	callback(db);
}