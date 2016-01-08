const request = require('request');
import { getMovieInfos } from './imdb/index';
import { parseID } from './imdb/id_parser';
import { getMovieFromDB, save } from './database/index';

function printUsage() {
  console.log('imdb-node ARGUMENT');
  console.log('WHERE');
  console.log('  Argument is the imdb-id or link');
}

function parseArguments(args) {
  if (args.length != 0) {
    const id = parseID(args[0]);
    let movie = false;
    if (id) {
      movie = getMovieFromDB(id).then((value) => {
        console.log(value);
      }).catch(error => {
        getMovieInfos(id).then(value => {
          console.log(value);
          save(value);
        }).catch(error => {
          console.log(error);
        })
      });
    }
  }
}

if (process.argv.length === 3) {
  parseArguments(process.argv.slice(2));
} else {
  printUsage();
}
