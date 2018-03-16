module.exports = (ctx) => {
  // console.log(ctx.update.message.entities);
  console.log('commands', ctx.state.command);
  console.log('commands', ctx.message);
  ctx.reply('Response from handler');
}
