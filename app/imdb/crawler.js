import fetch from 'node-fetch';
import cheerio from 'cheerio';

import { parseID } from './id_parser';
import { getRatingNew, getShortPlotNew, getYearNew} from './imdb_parser/new';
import { getRatingOld, getShortPlotOld, getYearOld } from './imdb_parser/old';

export function getMovie(link) {
  return new Promise((resolve, reject) => {
    fetch(link)
    .then(res => {
      if (res.status != 200) {
        reject('No movie found with the given id');
      }
      return res.text();
    })
    .then(body => {
      const json = {_id: parseID(link), title : "", year : "", rating : "", shortPlot: ""};
      const $ = cheerio.load(body);

      json.rating  = getRatingOld($) || getRatingNew($);
      json.shortPlot = getShortPlotOld($) || getShortPlotNew($);
      json.year = getYearOld($) || getYearNew($);

      resolve(json);
    });
  });
}
