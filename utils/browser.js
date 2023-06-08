// const puppeteer = require('puppeteer');
const chromium = require('chrome-aws-lambda');

async function startBrowser() {
  let browser;
  try {
    console.log('Opening the browser......');
    browser = await chromium.puppeteer.launch({
      // browser = await puppeteer.launch({
      // headless: true,
      // args: ['--disable-setuid-sandbox'],
      // ignoreHTTPSErrors: true,
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
