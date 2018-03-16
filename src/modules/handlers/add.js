const pageParse = require('../pageParse');

module.exports = async (ctx) => {
  // console.log(ctx.update.message.entities);
  console.log('args', ctx.state.command.args);
  const args = ctx.state.command.args;

  if (args && args.length) {
    const url = args[0];
    const info = await pageParse(url);

    console.log(info);
  }

  ctx.reply('Response from handler');
}
