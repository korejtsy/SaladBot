module.exports = (ctx) => {
  // console.log(ctx.update.message.entities);
  console.log('commands', ctx.state.command);
  console.log('commands', ctx.state.args);
  const args = ctx.state.commands.args;

  if (args && args.length) {
    const url = args[0];
  }
  ctx.reply('Response from handler');
}
