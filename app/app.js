const request = require('request');
import { getMovieInfos } from './imdb/index';

function printUsage() {
  console.log('imdb-node ARGUMENT');
  console.log('WHERE');
  console.log('  Argument is the imdb-id or link');
}

function parseArguments(args) {
  if (args.length != 0) {
    getMovieInfos(args[0]);
  }
}

parseArguments(process.argv.slice(2));
