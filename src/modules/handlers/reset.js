const clearOrderItems = require('../store/clearOrderItems');

module.exports = async (ctx) => {
  const chatId = ctx.update.message.chat.id;
  const userId = ctx.update.message.from.id;

  await clearOrderItems({ userId, chatId })

  ctx.reply('Items are reset');
}
