module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const userID = ctx.update.message.from.id;

  ctx.reply('Items are reset');
}
