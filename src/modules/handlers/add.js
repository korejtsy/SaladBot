module.exports = (ctx) => {
  console.log(ctx.update.message.entities);
  console.log(ctx.update.message.from);
  ctx.reply('Response from handler');
}
