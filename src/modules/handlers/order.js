const makeOrder = require('../makeOrder');
const fs = require('fs');
const forEach = require('lodash/forEach');
const getOrder = require('../store/getOrder');
const editOrder = require('../store/editOrder');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  ctx.reply('Ordering...');

  const order = await getOrder(chatID);

  if (order) {
    await editOrder(order.id, { status: 'ordered' })
  }

  const result = await makeOrder(order);
  const discount =
    order.chat.budget ? (order.chat.budget / Object.keys(result).length).toFixed() : 0;

  let md = '';

  forEach(result, (price, name) => {
    md += `*${name}*:\t${price} - ${discount} = ${price - discount} грн.\n`;
  });

  ctx.replyWithMarkdown(md);
  ctx.replyWithPhoto({ source: fs.createReadStream('./screenshots/cart.png')});
};
