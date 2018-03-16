const puppeteer = require('puppeteer');

const parsePage = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link);

  const price = parseInt(await page.evaluate(() =>
    document.querySelector('.main_detail_price .price').innerHTML
  ), 10);

  await browser.close();

  return {
    price,
  };
};
