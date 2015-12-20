import { parseID } from './id_parser';
import { createLink } from './link_creator';
import { getHTML } from './crawler';

export function getMovieInfos(link) {
  return getHTML(createLink(parseID(link)));
}
