const Extra = require('telegraf/extra');
const filter = require('lodash/filter');
const reduce = require('lodash/reduce');
const forEach = require('lodash/forEach');
const getOrder = require('../database/queries/getOrder');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const user = ctx.update.message.from;

  const order = await getOrder(chatID);

  if (order) {
    const items = filter(order.items, item => item.user.telegram_account_id == user.id);

    let md = `🛒 [@${user.first_name} ${user.last_name || ''}](tg://user?id=${user.id}) ${items.length === 0 ? 'has no' : `has *${items.length}*`} items

======================================================
`;

    let i = 0;
    forEach(items, (item, i) => {
      md += `${i + 1}) [${item.product_name}](${item.url}) ${item.mod ? `(${item.mod})` : ''} - *${item.price} грн.*  ${i !== Object.keys(items).length - 1 ? '\n' : ''}`;
    });

    md += `======================================================
*Sum: ${reduce(items, (current, item) => (current += item.price), 0)} грн.*
`;

    ctx.replyWithMarkdown(md, Extra.webPreview(false));
  } else {
    ctx.replyWithMarkdown(`No order in progress`);
  }
}

