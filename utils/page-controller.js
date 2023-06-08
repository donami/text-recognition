const pageScraper = require('./page-scraper');
async function scrapeAll(browserInstance, url) {
  let browser;
  try {
    browser = await browserInstance;
    pageScraper.url = url;
    const result = await pageScraper.scraper(browser, url);
    return result;
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err);
    throw err;
  }
}

module.exports = (browserInstance, url) => scrapeAll(browserInstance, url);
