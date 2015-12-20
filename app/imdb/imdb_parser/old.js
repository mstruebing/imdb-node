import cheerio from 'cheerio';

export function getRatingOld($) {
  let rating;
  $('.star-box-giga-star').filter(function(){
    rating = $(this).text().trim();
  })
  return rating;
}

export function getShortPlotOld($) {
  let shortPlot;
  $('p[itemprop=description]').filter(function(){
    shortPlot = $(this).text().trim();
  })
  return shortPlot;
}
