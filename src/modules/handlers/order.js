const makeOrder = require('../makeOrder');
const forEach = require('lodash/forEach');
const getOrder = require('../store/getOrder');

const amount = 250;

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  ctx.reply('Ordering...');

  const order = await getOrder(chatID)

  const result = await makeOrder(order);
  const discount = amount / Object.keys(result).length;

  let md = '';

  forEach(result, (price, name) => {
    md += `*${name}*:\t${price} - ${discount} = ${price - discount}грн.\n`;
  });

  ctx.replyWithMarkdown(md);
};
