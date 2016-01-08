const request = require('request');
import { getMovieInfos } from './imdb/index';
import { parseID } from './imdb/id_parser';
import { isInDatabase, save } from './database/index';

function printUsage() {
  console.log('imdb-node ARGUMENT');
  console.log('WHERE');
  console.log('  Argument is the imdb-id or link');
}

function parseArguments(args) {
  if (args.length != 0) {
    const id = parseID(args[0]);
    if (id && !isInDatabase(id)) {
      getMovieInfos(args[0]).then(value => {
        console.log(value);
        save(value);
      }).catch(error => {
        console.log(error);
      })
    }
  }
}

if (process.argv.length === 3) {
  parseArguments(process.argv.slice(2));
} else {
  printUsage();
}
