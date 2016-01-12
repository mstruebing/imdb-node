import mongoose from 'mongoose';

/**
 * The schema of a movie
 * @param {[type]} {	_id:     String  [description]
 * @param {[type]} title:     String  [description]
 * @param {[type]} year:      Number  [description]
 * @param {[type]} rating:    Number  [description]
 * @param {[type]} shortPlot: String} [description]
 */
const movieSchema = mongoose.Schema({
	_id: String,
	originalTitle: String,
	localeTitle: String,
	year: Number,
	rating: Number,
	shortPlot: String
});

movieSchema.static('findById', function (id, callback) {
	return this.find({_id: id}, callback);
});

const Movie = mongoose.model('Movie', movieSchema);

/**
 * connects to the database
 * @return {connection} the mongoose connection to the database
 */
function dbConnect() {
	return mongoose.connect('mongodb://moviefucker:pass@localhost:27017/movies');
}

/**
 * closes the database connection
 * @param  {connection} db the db connection
 */
function dbClose(db) {
	db.connection.close();
}

/**
 * saves the movie into database
 * @param  {json} movieJSON the json which should be stored
 * @return {boolean} true if saved successful, false if not
 */
export function save(movieJSON) {
	const movie = new Movie(movieJSON);
	const db = dbConnect();
	movie.save((err) => {
		dbClose(db);
		if (err) {
			console.error(err);
			return false;
		}

		console.log('saved into database');
		return true;
	});
}

/**
 * gets the movie from the database
 * @param  {string} id the imdb id
 * @return {Promise} a promise with the movie infos
 */
export function getMovieFromDB(id) {
	return new Promise((resolve, reject) => {
		const db = dbConnect();
		Movie.findById(id, (err, movie) => {
			dbClose(db);
			if (!err && movie.length > 0) {
				resolve(movie);
			} else {
				reject(err);
			}
		});
	});
}

/**
 * deletes all movies in the database
 */
export function dropCollection() {
	const db = dbConnect();
	Movie.collection.remove();
	dbClose(db);
}
