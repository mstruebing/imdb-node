import { parseID } from './idParser';
import { createLink } from './linkCreator';

export function getMovieInfos(link) {
  return createLink(parseID(link));
}
