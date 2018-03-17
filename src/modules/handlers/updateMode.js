const Telegraf = require('telegraf');
const pageParse = require('../pageParse');
const editItem = require('../store/editItem');

module.exports = async (ctx) => {
  try {
    const [id, mod] = ctx.callbackQuery.data.split('-');
    console.log('price', ctx.callbackQuery.data);
    await editItem(id, { mod });

    ctx.reply(`Mod "${mod}" has been set`);
  } catch (e) {
    console.error(e);
    ctx.reply(e.message);
  }
}

