import request from 'request';
import cheerio from 'cheerio';

import { parseID } from './id_parser';
import { getRatingNew } from './imdb_parser/new';
import { getRatingOld } from './imdb_parser/old';
import { getShortPlotNew } from './imdb_parser/new';
import { getShortPlotOld } from './imdb_parser/old';
import { getYearNew } from './imdb_parser/new';
import { getYearOld } from './imdb_parser/old';

export function getMovie(link) {
  if (link) {

    request(link, (error, response, html) => {
      if (!error) {
        const json = {_id: parseID(link), title : "", year : "", rating : "", shortPlot: ""};
        const $ = cheerio.load(html);

        json.rating  = getRatingOld($) || getRatingNew($);
        json.shortPlot = getShortPlotOld($) || getShortPlotNew($);
        json.year = getYearOld($) || getYearNew($);

        console.log(json);
        return json;
      }
    });
  }
}
