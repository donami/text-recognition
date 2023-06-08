const scraperObject = {
  url: 'https://www.futwiz.com',
  async scraper(browser, url) {
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    await page.goto(url);
    let scrapedData = [];
    // Wait for the required DOM to be rendered
    await page.waitForSelector('.player-prices');
    // Get all prices
    let prices = await page.$$eval('.player-prices .price-num', (links) => {
      if (links.length) {
        return links[0].textContent;
      }
      return 0;
    });
    scrapedData.push(urls);
    console.log(urls);
    await page.close();
    return scrapedData;
  },
};

module.exports = scraperObject;
