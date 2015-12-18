import { parseID } from './id_parser';
import { createLink } from './link_creator';

export function getMovieInfos(link) {
  return createLink(parseID(link));
}
