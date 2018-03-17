const puppeteer = require('puppeteer');

const parsePage = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const price = parseInt(await page.evaluate(() =>
    document.querySelector('.main_detail_price .price').innerHTML
  ), 10);

  const productName = await page.evaluate(() =>
    document.querySelector('.bx_item_title h1').innerHTML
  );

  const modsAvailable = await page.evaluate(() => {
    const modsNodes = document.querySelectorAll('.bx_scu ul li:not(.bx_missing)');
    const modsNodesArr = Array.prototype.slice.call(modsNodes);

    return modsNodesArr.map(node => node.querySelector('i').getAttribute('title'));
  });

  const mod = await page.evaluate(() => {
    const node = document.querySelector('.bx_scu ul li.bx_active i');

    if (node) {
      return document.querySelector('.bx_scu ul li.bx_active i').getAttribute('title');
    }
    return null;
  });

  await browser.close();

  return {
    url,
    product_name: productName.replace(/[\n\t]+/g, ' ').trim().replace(/\s{2}/g, ''),
    price,
    mods_available: modsAvailable,
    mod,
  };
};

module.exports = parsePage;
