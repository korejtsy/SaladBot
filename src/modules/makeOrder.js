const puppeteer = require('puppeteer');

const cartURL = 'https://salad.com.ua/personal/cart/';
const DATA = [
  {
    user_id: 1,
    name: 'Slava',
    items: [
      {
        url: 'https://salad.com.ua/catalog/nabory/set-1/',
        mod: null,
      },
      {
        url: 'https://salad.com.ua/catalog/garniry/kus-kus-s-ovoshchami/',
        mod: null,
      },
    ],
  },
  {
    user_id: 2,
    name: 'Slon',
    items: [
      {
        url: 'https://salad.com.ua/catalog/nabory/set-1/',
        mod: null,
      },
      {
        url: 'https://salad.com.ua/catalog/garniry/kus-kus-s-ovoshchami/',
        mod: null,
      },
    ],
  },
];
const addProductsToCart = async (page, orders) => {
  const result = {};

  for (let i in orders) {
    const links = orders[i].items;
    let sum = 0;

    for (let j = 0; j < links.length; j++) {
      console.log('Go to: ', links[j].url);
      await page.goto(links[j].url);

      page.setViewport({ width: 1920, height: 4200 });

      const price = parseInt(await page.evaluate(() =>
        document.querySelector('.main_detail_price .price').innerHTML
      ));
      sum += price;

      await page.click('.detail_buy_button.show_basket_popup.inline');

      console.log('Screenshot', `${orders[i].user_id}-${j}.png`);
      // await page.screenshot({ path: `screenshots/${orders[i].user}-${j}.png` });
    }

    result[orders[i].name] = sum;
  }

  console.log('sss', result);
  return result;
};

const createCart = async (page) => {
  await page.goto(cartURL);
  await page.screenshot({ path: `screenshots/cart.png` });
  await page.goto('https://salad.com.ua/personal/order/make/');
  await page.screenshot({ path: `screenshots/order_form.png` });
  // Fields
};

const fillForm = async (page, result, user, chat) => {
  await page.evaluate((result, user, chat) => {
    document.querySelector('#ORDER_PROP_1').value = user.name;
    document.querySelector('#ORDER_PROP_2').value = user.email;
    document.querySelector('#ORDER_PROP_3').value = user.phone;

    document.querySelector('#ORDER_PROP_34').value = user.bonus_card_number;
    document.querySelector('#ORDER_PROP_28').value = Object.keys(result).length;

    document.querySelector('#ORDER_PROP_29').value = chat.street;
    document.querySelector('#ORDER_PROP_30').value = chat.house_number;
    document.querySelector('#ORDER_PROP_41').value = chat.floor;
  }, result, user, chat);

  await page.screenshot({ path: `screenshots/form.png` });
}

module.exports = async (data = DATA) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const result = await addProductsToCart(page, data);
  // console.log('RESULT', result);

  const user = {
    name: 'Slon',
    email: 'ssds@mail.com',
    phone: '043334443',
    bonus_card_number: '03327',
  }

  const chat = {
    street: 'пл Победы 10, Империал',
    house_number: 10,
    floor: 3,
  }

  await createCart(page);
  await fillForm(page, result, user, chat);

  await browser.close();

  return result;
};
