const Telegraf = require('telegraf');
const model = require('../model')
const config = require('../config');
const session = require('telegraf/session');
const commandArgsMiddleware = require('../middlewares/commandArgs');

module.exports = {
  start: () => {
    model.sync({
      force: true,
      alter: true
    })

    const bot = new Telegraf(config.bot.token, { username: config.bot.username });

    const handlers = require('./handlers');

    bot.use(commandArgsMiddleware());
    bot.use(session());

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

    bot.command('/add', handlers.add);

    bot.command('reset', ctx => {
      ctx.reply('Reset');
    });

    bot.command('order', ctx => {
      ctx.reply('Order');
    });

    bot.command('add_user', handlers.add_user);

    bot.command('edit_user', ctx => {
      ctx.reply('Edit user');
    });

    bot.command('settings', ctx => {
      ctx.reply('Settings');
    });

    bot.on('callback_query', (ctx) => {
      console.log(ctx.session.product.url);
      console.log(ctx.callbackQuery.data);
      ctx.session.product.mod = ctx.callbackQuery.data;
      ctx.reply(`Updated: ${JSON.stringify(ctx.session.product)}`);
    });

    bot.startPolling();
  }
}
