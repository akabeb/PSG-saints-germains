const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: "new"
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.ausaintsperes.com/');
  await page.screenshot({ path: 'live-site.png' });
  
  await page.goto('http://localhost:3000/');
  await page.screenshot({ path: 'localhost.png' });
  
  console.log("Screenshots taken");
  await browser.close();
})();
