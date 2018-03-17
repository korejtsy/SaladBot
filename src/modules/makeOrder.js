const puppeteer = require('puppeteer');

const cartURL = 'https://salad.com.ua/personal/cart/';

async function screenshotDOMElement(page, selector, path, padding = 0) {
  const rect = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    if (element) {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }
  }, selector);

  if (rect) {
    return await page.screenshot({
      path,
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      }
    });
  }
}


const addProductsToCart = async (page, order) => {
  const result = {};

  for (let i in order.items) {
    const item = order.items[i];
    console.log('Go to: ', item.url);
    await page.goto(item.url);

    page.setViewport({ width: 1920, height: 4200 });

    const price = parseInt(await page.evaluate(() =>
      document.querySelector('.main_detail_price .price').innerHTML
    ), 10);

    console.log('price', price);

    result[item.user.name] = (result[item.user.name] || 0) + price;

    await page.click('.detail_buy_button.show_basket_popup.inline');

    console.log('Screenshot', `user_${item.user.id}-${i}.png`);
    // await page.screenshot({ path: `screenshots/${orders[i].user}-${j}.png` });
  }

  console.log('sss', result);
  return result;
};

const createCart = async (page) => {
  await page.goto(cartURL);
  // await page.screenshot({ path: `screenshots/cart.png` });
  await screenshotDOMElement(page, '.basket_items_block', 'screenshots/cart.png', 10);
  await page.goto('https://salad.com.ua/personal/order/make/');
  await page.screenshot({ path: `screenshots/order_form.png` });
  // Fields
};

const fillForm = async (page, result, user, chat) => {
  await page.evaluate((result, user, chat) => {
    document.querySelector('#ORDER_PROP_1').value = user.name || '';
    document.querySelector('#ORDER_PROP_2').value = user.email || '';
    document.querySelector('#ORDER_PROP_3').value = user.phone || '';

    document.querySelector('#ORDER_PROP_34').value = user.bonus_card_number || '';
    document.querySelector('#ORDER_PROP_28').value = Object.keys(result).length || 1;

    document.querySelector('#ORDER_PROP_29').value = chat.street || '';
    document.querySelector('#ORDER_PROP_30').value = chat.house_number || '';
    document.querySelector('#ORDER_PROP_41').value = chat.floor || '';
  }, result, user, chat);

  await page.screenshot({ path: `screenshots/form.png` });
}

module.exports = async (order, user) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // console.log(order);
  const result = await addProductsToCart(page, order);
  // console.log('RESULT', result);

  const chat = order.chat;

  await createCart(page);
  await fillForm(page, result, user, chat);

  await browser.close();

  return result;
};
