export function getRatingNew($) {
  return $('span[itemprop=ratingValue]').text().trim();
}

export function getShortPlotNew($) {
  return $('div.summary_text[itemprop=description]').text().trim();
}

export function getYearNew($) {
  return $('#titleYear a').text().trim();
}
