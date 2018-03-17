const Telegraf = require('telegraf');
const pageParse = require('../pageParse');
const addItem = require('../store/addItem');

module.exports = async (ctx) => {
  const args = ctx.state.command.args;
  const userId = ctx.update.message.from.id;
  const chatId = ctx.update.message.chat.id;

  console.log(args);

  if (args && args.length) {
    const url = args[0];
    if (url === 'https://salad.com.ua/' || url === 'https://salad.com.ua/contacts/') {
      ctx.reply('Not valid link');
      return;
    }

    if (!/salad.com.ua/.test(url)) {
      ctx.reply('Not valid link');
      return;
    }

    try {
      ctx.session.product = await pageParse(url);
    } catch (e) {
      console.error(e);
      ctx.reply(e.message);
    }

    if (ctx.session.product.mods_available.length) {
      const menu = Telegraf.Extra
        .markdown()
        .markup((m) => m.inlineKeyboard(
          ctx.session.product.mods_available.map(item =>
            m.callbackButton(item, item)
          )
        ));

      console.log('ctx.state.product', ctx.session.product);
      ctx.reply('Please choose type:', menu);
      return;
    }

    addItem({ url, userId, chatId })

    ctx.reply(`Product "${ctx.session.product.product_name}" has been added`);
    return;
  }

  ctx.reply('Link not provided');
}
