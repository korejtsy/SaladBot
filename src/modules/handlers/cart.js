const filter = require('lodash/filter');
const forEach = require('lodash/forEach');
const getOrder = require('../store/getOrder');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const user = ctx.update.message.from;

  const order = await getOrder(chatID);
  const items = filter(order.items, item => item.user.telegram_account_id == user.id);

  let md = `[@${user.first_name} ${user.last_name || ''}](tg://user?id=${user.id}) ${items.length === 0 ? 'has no' : ''} *items*
  
`;

  forEach(items, item => {
    md += `${item.url} ${item.mod ? `(${item.mod})` : ''}`;
  });

  ctx.replyWithMarkdown(md);
}

