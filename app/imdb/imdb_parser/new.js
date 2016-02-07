export function getRatingNew($) {
	return $('span[itemprop=ratingValue]').text().trim();
}

export function getShortPlotNew($) {
	return $('div.summary_text[itemprop=description]').text().trim();
}

export function getYearNew($) {
	return $('#titleYear a').text().trim();
}

export function getLocaleTitleNew($) {
	const str = $('div.title_block h1[itemprop=name]').text().trim();
  const end = str.lastIndexOf('(');
  return str.substr(0, end);
}

export function getOriginalTitleNew($) {
  const str = $('div.originalTitle').text().trim();
  const end = str.lastIndexOf('(');
  return str.substr(0, end);
}
