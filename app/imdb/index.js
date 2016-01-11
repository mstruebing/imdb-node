import {parseID} from './id_parser';
import {createLink} from './link_creator';
import {getMovie} from './crawler';

/**
 * Composes the function needed to get movie infos
 * @param  {string} link the imdb-link or id
 * @return {json} the json with the movie infos
 */
export function getMovieInfos(link) {
	return getMovie(createLink(parseID(link)));
}
