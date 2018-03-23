const filter = require('lodash/filter');
const forEach = require('lodash/forEach');
const getOrder = require('../database/queries/getOrder');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const user = ctx.update.message.from;

  const order = await getOrder(chatID);

  if (order) {
    const items = filter(order.items, item => item.user.telegram_account_id == user.id);

    let md = `[@${user.first_name} ${user.last_name || ''}](tg://user?id=${user.id}) ${items.length === 0 ? 'has no' : `has *${items.length}*`} items
    
`;

    forEach(items, (item, i) => {
      md += `${i + 1}) [${item.product_name}](${item.url}) ${item.mod ? `(${item.mod})` : ''} \n`;
    });

    ctx.replyWithMarkdown(md);
  } else {
    ctx.replyWithMarkdown(`No order in progress`);
  }
}

