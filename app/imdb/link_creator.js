/**
 * create the imdb link to parse
 * @param  {string} id the imdb id
 * @return {string} the imdb url to crawl
 */
export function createLink(id) {
	return id ? 'http://www.imdb.com/title/' + id : null;
}
