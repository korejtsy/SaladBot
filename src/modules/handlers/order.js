const makeOrder = require('../makeOrder');
const fs = require('fs');
const forEach = require('lodash/forEach');
const getOrder = require('../store/getOrder');
const getRandomUser = require('../store/getRandomUser');
const editOrder = require('../store/editOrder');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  ctx.reply('Ordering...');

  const order = await getOrder(chatID);
  const user = await getRandomUser();

  console.log('user', user);

  if (order) {
    await editOrder(order.id, { status: 'ordered' })
  }

  const result = await makeOrder(order, user);
  const discount =
    order.chat.budget ? (order.chat.budget / Object.keys(result).length).toFixed() : 0;

  let md = '';

  forEach(result, (price, name) => {
    md += `*${name}*:\t${price} - ${discount} = ${price - discount} грн.\n`;
  });

  ctx.replyWithMarkdown(md);
  ctx.replyWithPhoto({ source: fs.createReadStream('./screenshots/cart.png')});
};
