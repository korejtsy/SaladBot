const Telegraf = require('telegraf');
const pageParse = require('../pageParse');
const editItem = require('../store/editItem');

module.exports = async (ctx) => {
  try {
    const [id, mod, price] = ctx.callbackQuery.data.split('-');
    await editItem(id, { mod });

    ctx.reply(`Mod "${mod}" has been set`);
  } catch (e) {
    console.error(e);
    ctx.reply(e.message);
  }
}

