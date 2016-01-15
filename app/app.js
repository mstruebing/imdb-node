import {getMovieInfos} from './imdb/index';
import {parseID} from './imdb/id_parser';
import {getMovieFromDB, save, dropCollection} from './database/index';

/**
 * prints the usage
 */
function printUsage() {
	console.log('imdb-node <imdb-link|imdb-id>|<delete>');
	console.log('  delete will delete the saved movies');
}

/**
 * Prints the movie attributes
 * @param  {JSON} movie the movie to print
 */
function printMovie(movie) {
	console.log('id:', movie.id);
	console.log('original title:', movie.originalTitle);
	console.log('locale title:', movie.localeTitle);
	console.log('genre:', movie.genre.join(', '));
	console.log('year:', movie.year);
	console.log('rating:', movie.rating);
	console.log('short plot:', movie.shortPlot);
}

/**
 * parses the arguments and invokes the needed functions
 * @param  {Array} args the arguments
 */
function parseArguments(args) {
	if (args.length !== 0 && args[0] !== 'delete') {
		const id = parseID(args[0]);
		if (id) {
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
		} else {
			console.error('ERROR: not a valid imdb id or link');
			printUsage();
		}
	} else if (args[0] === 'delete') {
		dropCollection();
	}
}

if (process.argv.length === 3) {
	parseArguments(process.argv.slice(2));
} else {
	printUsage();
}
