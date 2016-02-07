import fetch from 'node-fetch';
import cheerio from 'cheerio';

import {parseID} from './id_parser';
import {getRatingNew, getShortPlotNew, getYearNew, getLocaleTitleNew, getOriginalTitleNew} from './imdb_parser/new';
import {getLocaleTitleOld, getOriginalTitleOld, getGenreOld, getRatingOld, getShortPlotOld, getYearOld} from './imdb_parser/old';

/**
 * crawls the movie and generates the json
 * @param  {string} link the imdb link to crawl
 * @return {Promise} a promise which resolves with the json
 */
export function getMovie(link) {
	return new Promise((resolve, reject) => {
		fetch(link).then(res => {
			if (res.status !== 200) {
				reject('No movie found with the given id');
			}
			return res.text();
		}).then(body => {
			const json = {_id: parseID(link), originalTitle: '', localeTitle: '', genre: '', year: '', rating: '', shortPlot: ''};
			const $ = cheerio.load(body);

			json.originalTitle = getOriginalTitleOld($) || getOriginalTitleNew($);
			json.localeTitle = getLocaleTitleOld($) || getLocaleTitleNew($);
			json.rating = getRatingOld($) || getRatingNew($);
			json.shortPlot = getShortPlotOld($) || getShortPlotNew($);
			json.year = getYearOld($) || getYearNew($);
			json.genre = getGenreOld($);

			resolve(json);
		});
	});
}
