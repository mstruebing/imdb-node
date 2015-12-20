import { parseID } from './id_parser';
import { createLink } from './link_creator';
import { getMovie } from './crawler';

export function getMovieInfos(link) {
  return getMovie(createLink(parseID(link)));
}
