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
 * parses the arguments and invokes the needed functions
 * @param  {Array} args the arguments
 */
function parseArguments(args) {
	if (args.length !== 0 && args[0] !== 'delete') {
		const id = parseID(args[0]);
		if (id) {
			getMovieFromDB(id).then((value) => {
				console.log('id:', value[0].id);
				console.log('original title:', value[0].originalTitle);
				console.log('locale title:', value[0].localeTitle);
				console.log('genre:', value[0].genre.join(', '));
				console.log('year:', value[0].year);
				console.log('rating:', value[0].rating);
				console.log('short plot:', value[0].shortPlot);
			}).catch(() => {
				getMovieInfos(id).then(value => {
					save(value);
					console.log('id:', value.id);
					console.log('original title:', value.originalTitle);
					console.log('locale title:', value.localeTitle);
					console.log('genre:', value.genre.join(', '));
					console.log('year:', value.year);
					console.log('rating:', value.rating);
					console.log('short plot:', value.shortPlot);
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
