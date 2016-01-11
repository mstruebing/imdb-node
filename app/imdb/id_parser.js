/**
 * parses the imdb-id out of an imdb-link
 * @param  {string} link the imdb link
 * @return {string} the imdb link
 */
export function parseID(link) {
	const regexLink = /tt[0-9]{7}\//;
	const regex = /tt[0-9]{7}$/;

	if (link.match(regexLink)) {
		const match = link.match(regexLink)[0];
		return match.substring(0, match.length - 1);
	} else if (link.match(regex)) {
		return link.match(regex)[0];
	}
	return null;
}
