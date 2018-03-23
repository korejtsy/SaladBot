const editItem = require('../database/queries/editItem');

// TODO: callback_queries types?
module.exports = async (ctx) => {
  try {
    const [id, mod, userId] = ctx.callbackQuery.data.split('-');

    if (ctx.update.callback_query.from.id !== +userId) {
      return;
    }

    await editItem(id, { mod });

    ctx.reply(`Mod "${mod}" has been set`);
  } catch (e) {
    console.error(e);
    ctx.reply(e.message);
  }
};
