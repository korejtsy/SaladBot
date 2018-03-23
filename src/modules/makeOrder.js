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

    if (item.mod) {
      const selector = `.bx_scu ul li:not(.bx_missing) i[title="${item.mod}"]`;
      await page.click(selector);

    }

    const price = parseInt(await page.evaluate(() => {
      const node = document.querySelector('.offers_hide:not([style="display: none;"]) .price');
      return node ? node.innerHTML : 0;
    }), 10);

    result[item.user.name] = (result[item.user.name] || 0) + price;

    // await page.click('.detail_buy_button.show_basket_popup.inline');
    try {
      await page.click('.offers_hide:not([style="display: none;"]) .detail_buy_button');
    } catch (e) {
      console.log(e);
    }

    console.log('Screenshot', `user_${item.user.id}-${i}.png`);
    // await page.screenshot({ path: `screenshots/${orders[i].user}-${j}.png` });
  }

  console.log('sss', result);
  return result;
};

const createCart = async (page) => {
  await page.goto(cartURL);
  // await page.screenshot({ path: `screenshots/cart.png` });
  try {
    await screenshotDOMElement(page, '.basket_items_block', 'screenshots/cart.png', 10);
  } catch (e) {
    console.log('Screenshot cart not found')
  }
  await page.goto('https://salad.com.ua/personal/order/make/');
  try {
    await page.screenshot({ path: `screenshots/order_form.png` });
  } catch (e) {
    console.log('Screenshot order_form not found')
  }
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

  try {
    await page.screenshot({ path: `screenshots/form.png` });
  } catch (e) {
    console.log('Screenshot form not found');
  }
};

const doOrder = async (page) => {
  console.log('DO)ORDER');
  await page.click('.checkout.button');
  await page.screenshot({ path: `screenshots/ordered.png` });
};

module.exports = async (order, user) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // console.log(order);
  const result = await addProductsToCart(page, order);
  const chat = order.chat;

  await createCart(page);
  await fillForm(page, result, user, chat);
  if (process.env.NODE_ENV === 'production') {
    await doOrder(page);
  }

  await browser.close();

  return result;
};
