import {getMovieInfos} from './imdb/index';
import {parseID} from './imdb/id_parser';
import {createLink} from './imdb/link_creator';
import {getMovieFromDB, getRandomMovieFromDB, save, dropCollection} from './database/index';

/**
 * prints the usage
 */
function printUsage(wrongArgs) {
	if (wrongArgs) {
		console.error('ERROR: wrong arguments');
	}
	console.log('imdb-node <imdb-link|imdb-id>|<delete>');
	console.log('  --delete|-D will delete the saved movies');
}

/**
 * Prints the movie attributes
 * @param  {JSON} movie the movie to print
 */
function printMovie(movie) {
	console.log('id:', movie._id);
	console.log('original title:', movie.originalTitle);
	console.log('locale title:', movie.localeTitle);
	console.log('genre:', movie.genre.join(', '));
	console.log('year:', movie.year);
	console.log('rating:', movie.rating);
	console.log('short plot:', movie.shortPlot);
	console.log(`\ngo to ${createLink(movie._id)} for more information`);
}

/**
 * gets the movie either from db or live page and saves it to database
 * @param  {Integer} id the imdb id
 */
function getMovie(id) {
	getMovieFromDB(id).then((value) => {
		printMovie(value[0]);
	}).catch(() => {
		getMovieInfos(id).then(value => {
			save(value);
			printMovie(value);
		}).catch(error => {
			console.log(error);
		});
	});
}

/**
 * gets a random movie from database
 * @param  {Integer} id the imdb id
 */
function getRandomMovie() {
	getRandomMovieFromDB().then((value) => {
		printMovie(value[0]);
	}).catch((err) => {
    console.error(err);
	});
}


/**
 * parses the arguments and invokes the needed functions
 * @param  {Array} args the arguments
 */
function parseArguments(args) {
	const id = parseID(args[0]);
	if (!id) {
		let genre;
		let minRating;
		args.forEach((arg, i) => {
			switch (arg) {
				case '-g':
				case '--genre': genre = args[i + 1]; break;
				case '-mr':
				case '--min-rating': minRating = args[i + 1]; break;
				case '-D':
				case '--delete': dropCollection(); break;
				default: break;
			}
		});
	} else {
		getMovie(id);
	}
}

if (process.argv.length >= 3) {
	parseArguments(process.argv.slice(2));
} else {
  getRandomMovie();
}
