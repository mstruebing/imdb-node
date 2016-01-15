export function getRatingOld($) {
	return $('.star-box-giga-star').text().trim();
}

export function getShortPlotOld($) {
	return $('p[itemprop=description]').text().trim();
}

export function getYearOld($) {
	return $('h1.header span.nobr a').text().trim();
}

export function getOriginalTitleOld($) {
	const str = $('h1.header span.title-extra[itemprop=name]').text().trim();
	const start = str.indexOf('"') + 1;
	const end = str.indexOf('"', start);
	return str.substring(start, end);
}

export function getLocaleTitleOld($) {
	return $('h1.header span.itemprop[itemprop=name]').text().trim();
}

export function getGenreOld($) {
	let genres = [];
	$('span.itemprop[itemprop=genre]').each(function (i) {
		genres[i] = $(this).text().trim();
	});
	return genres;
}
