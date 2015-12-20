import cheerio from 'cheerio';

export function getRatingNew($) {
  let rating;
  $('span[itemprop=ratingValue]').filter(function(){
    rating = $(this).text().trim();
  })
  return rating;
}

export function getShortPlotNew($) {
  let shortPlot;
  $('div.summary_text[itemprop=description]').filter(function(){
    shortPlot = $(this).text().trim();
  })
  return shortPlot;
}
