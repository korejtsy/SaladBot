const makeOrder = require('../browser-actions/makeOrder');
const fs = require('fs');
const forEach = require('lodash/forEach');
const getOrder = require('../database/queries/getOrder');
const getRandomUser = require('../lib/getRandomUser');
const editOrder = require('../database/queries/editOrder');
const isValidOrder = require('../validators/order');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  ctx.reply('Ordering...');

  const order = await getOrder(chatID);
  const user = await getRandomUser(order);

  if (order) {
    await editOrder(order.id, { status: 'ordered' });
  } else {
    ctx.reply('All orders are finished');
    return;
  }

  if (!isValidOrder(ctx, user, order.chat)) {
    return;
  }

  const result = await makeOrder(order, user);
  if (!result) {
    ctx.reply('some errror');
    return;
  }

  const discount =
    order.chat.budget ? (order.chat.budget / Object.keys(result).length).toFixed() : 0;

  let md = `*${user.name}* is lucky!
  
`;

  forEach(result, (price, name) => {
    md += `*${name}*:\t${price} - ${discount} = ${price - discount} грн.\n`;
  });

  ctx.replyWithMarkdown(md);
  ctx.replyWithPhoto({ source: fs.createReadStream('./screenshots/cart.png') });
};