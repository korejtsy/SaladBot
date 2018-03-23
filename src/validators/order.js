module.exports = (ctx, user, chat) => {
  let result = true;

  if (!user.name) {
    ctx.reply('⚠️ Please fill user name');
  }

  if (!user.bonus_card_number) {
    ctx.reply('⚠️ Discond card is not filled');
  }

  if (!user.email) {
    ctx.reply('⚠️ We can\'t order without email');
    result = false;
  }

  if (!user.phone) {
    ctx.reply('⚠️ We can\'t order without phone ');
    result = false;
  }

  if (!chat.street) {
    ctx.reply('⚠️ Settings "Street" is required');
    result = false;
  }

  return result;
};
