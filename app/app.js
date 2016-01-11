import {getMovieInfos} from './imdb/index';
import {parseID} from './imdb/id_parser';
import {getMovieFromDB, save} from './database/index';

/**
 * prints the usage
 */
function printUsage() {
	console.log('imdb-node ARGUMENT');
	console.log('WHERE');
	console.log('  Argument is the imdb-id or link');
}

/**
 * parses the arguments and invokes the needed functions
 * @param  {Array} args the arguments
 */
function parseArguments(args) {
	if (args.length !== 0) {
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
		}
	}
}

if (process.argv.length === 3) {
	parseArguments(process.argv.slice(2));
} else {
	printUsage();
}
