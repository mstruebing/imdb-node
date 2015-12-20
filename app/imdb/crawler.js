import request from 'request';
import cheerio from 'cheerio';

import { parseID } from './id_parser';
import { getRatingNew } from './imdb_parser/new';
import { getRatingOld } from './imdb_parser/old';
import { getShortPlotNew } from './imdb_parser/new';
import { getShortPlotOld } from './imdb_parser/old';

export function getHTML(link) {
  if (link) {
    request(link, (error, response, html) => {
      if(!error){

        const json = {_id: parseID(link), title : "", year : "", rating : "", shortPlot: ""};
        const $ = cheerio.load(html);

        let rating;
        let shortPlot;

        if (!(rating = getRatingOld($))) {
          rating = getRatingNew($);
        }

        if (!(shortPlot = getShortPlotOld($))) {
          shortPlot = getShortPlotNew($);
        }

        json.rating = rating;
        json.shortPlot = shortPlot;
        console.log(json);
      }
    });
  }
}
