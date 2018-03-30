const clearOrderItems = require('../database/queries/clearOrderItems');
const get = require('lodash/get');
const cart = require('./cart');

module.exports = async (ctx) => {
  const args = ctx.state.command.args;
  const chatId = ctx.update.message.chat.id;
  const userId = ctx.update.message.from.id;

  const id = +get(args, 0)

  if (!id) {
    ctx.reply('ID of item should be specified');
    return 
  }

  const removedItem = await clearOrderItems({ userId, chatId, id });

  if (!removedItem) {
    ctx.reply('Item not found');
    return
  }

  ctx.reply(`'${removedItem.product_name}' is removed`);
  cart(ctx)
};
