const Extra = require('telegraf/extra');
const filter = require('lodash/filter');
const sumBy = require('lodash/sumBy');
const map = require('lodash/map');
const getOrder = require('../database/queries/getOrder');

const line = '======================================================'
const count = item => (+item.count || 1)

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const user = ctx.update.message.from;

  const order = await getOrder(chatID);

  if (order) {
    const items = filter(order.items, item => item.user.telegram_account_id == user.id);

    const md = `🛒 [@${user.first_name} ${user.last_name || ''}](tg://user?id=${user.id}) ${items.length === 0 ? 'has no' : `has *${items.length}*`} items \n\n${
    line}${
      map(items, (item, i) =>
        `\n${i + 1}) id: ${item.id}, [${item.product_name}](${item.url}) ${item.mod ? `(${item.mod})` : ''} x ${count(item)} - *${(item.price * count(item))} грн.*`
      )
    }\n${line
    }\n*Sum: ${sumBy(items, item => item.price * count(item))} грн.* \n`;

    ctx.replyWithMarkdown(md, Extra.webPreview(false));
  } else {
    ctx.replyWithMarkdown(`No order in progress`);
  }
}

