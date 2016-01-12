import {getMovieInfos} from './imdb/index';
import {parseID} from './imdb/id_parser';
import {getMovieFromDB, save, dropCollection} from './database/index';

/**
 * prints the usage
 */
function printUsage() {
	console.log('imdb-node <imdb-link|imdb-id>|<delete>');
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
				console.log(value);
			}).catch(() => {
				getMovieInfos(id).then(value => {
					console.log(value);
					save(value);
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
