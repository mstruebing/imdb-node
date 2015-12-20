import cheerio from 'cheerio';

export function getRatingOld($) {
  return $('.star-box-giga-star').text().trim();
}

export function getShortPlotOld($) {
  return $('p[itemprop=description]').text().trim();
}

export function getYearOld($) {
  return $('h1.header span.nobr a').text().trim();
}
