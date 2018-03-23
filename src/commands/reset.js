const clearOrderItems = require('../database/queries/clearOrderItems');

module.exports = async (ctx) => {
  const chatId = ctx.update.message.chat.id;
  const userId = ctx.update.message.from.id;

  await clearOrderItems({ userId, chatId });

  ctx.reply('Items are reset');
};
