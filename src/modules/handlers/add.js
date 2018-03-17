const Telegraf = require('telegraf');
const pageParse = require('../pageParse');

module.exports = async (ctx) => {
  // console.log(ctx.update.message.entities);
  console.log('args', ctx.state.command.args);
  const args = ctx.state.command.args;

  if (args && args.length) {
    const url = args[0];
    ctx.session.product = await pageParse(url);

    if (ctx.session.product.mods_available) {
      const menu = Telegraf.Extra
        .markdown()
        .markup((m) => m.inlineKeyboard(
          ctx.session.product.mods_available.map(item =>
            m.callbackButton(item, item)
          )
        ));

      console.log('ctx.state.product', ctx.session.product);
      ctx.reply('Please choose type:', menu).then((ctx) => {
        // console.log('type', ctx);
      });
      return;
    }
  }

  ctx.reply('Response from handler');
}
