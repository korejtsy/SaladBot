const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN, { username: 'SaladZtBot' });

bot.start((ctx) => {
  console.log('start');
  console.log('Started:', ctx.from.id);
  return ctx.reply('Welcome!');
});

// bot.on('text', (ctx) => ctx.reply('Hello World 2'))

bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('Response time %sms', ms);
});

// List of commands
bot.command('help', ctx => {
  ctx.reply(`Help: Commands list`);
});


bot.command('start', ctx => {
  console.log('start');
  ctx.reply('Start');
});

bot.command('cart', ctx => {
  console.log('cart');
  ctx.reply('Cart');
});

bot.command('add', ctx => {
  ctx.reply('Add');
});

bot.command('reset', ctx => {
  ctx.reply('Reset');
});

bot.command('order', ctx => {
  ctx.reply('Order');
});

bot.command('add_user', ctx => {
  ctx.reply('Add user');
});

bot.command('edit_user', ctx => {
  ctx.reply('Edit user');
});

bot.command('settings', ctx => {
  ctx.reply('Settings');
});

bot.startPolling();
