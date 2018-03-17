const makeOrder = require('../makeOrder');
const forEach = require('lodash/forEach');

const amount = 250;

module.exports = async (ctx) => {
  ctx.reply('Ordering...');
  const result = await makeOrder();
  const discount = amount / Object.keys(result).length;

  let md = '';

  forEach(result, (price, name) => {
    md += `*${name}*:\t${price} - ${discount} = ${price - discount}грн.\n`;
  });

  ctx.replyWithMarkdown(md);
};
