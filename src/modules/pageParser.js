const puppeteer = require('puppeteer');

const SELECTORS = {
  PRODUCT_NAME: 'bx_item_title h1',
  PRICE: '.main_detail_price .price',
  MODS_LIST: '.bx_scu ul li:not(.bx_missing)',
  MODS_CURRENT_ACTIVE: '.bx_scu ul li.bx_active i',
  MODS_NAME: 'i ',
};

const parsePage = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link);

  const price = parseInt(await page.evaluate(() =>
    document.querySelector(SELECTORS.PRICE).innerHTML
  ), 10);

  const productName = await page.evaluate(() =>
    document.querySelector(SELECTORS.PRODUCT_NAME).innerHTML
  );

  const modsAvailable = await page.evaluate(() => {
    const modsNodes = document.querySelectorAll(SELECTORS.MODS_LIST);
    const modsNodesArr = Array.prototype.slice.call(modsNodes);

    return modsNodesArr.map(node => node.querySelector(SELECTORS.MODS_NAME).getAttribute('title'));
  });

  const mod = await page.evaluate(() =>
    document.querySelector(SELECTORS.MODS_CURRENT_ACTIVE).getAttribute('title')
  );

  await browser.close();

  return {
    product_name: productName,
    price,
    mods_available: modsAvailable,
    mod,
  };
};

module.exports = parsePage;
