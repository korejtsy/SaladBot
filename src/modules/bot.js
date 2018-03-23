const Telegraf = require('telegraf');
const model = require('../model');
const config = require('../../config/config');
const handlers = require('./handlers');

const commandArgsMiddleware = require('../middlewares/commandArgs');

module.exports = {
  start: () => {
    model.sync({
      force: true,
      alter: true,
    });

    const bot = new Telegraf(config.bot.token, { username: config.bot.username });

    bot.use(commandArgsMiddleware());

    bot.start((ctx) => {
      console.log('start');
      console.log('Started:', ctx.from.id);
      return ctx.reply('Welcome!');
    });

    bot.use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      console.log('Response time %sms', ms);
    });

    // List of commands
    bot.command('help', ctx => {
      ctx.replyWithMarkdown(`I can help you order food from salad.com.ua!

You can control me by sending these commands:

*/help* - Show help info
*/cart* - Current state of cart
*/add* - Add item to cart
*/reset* - Clear current cart
*/order* - Submit order
*/user* - Adds user
*/settings* - Edit chat/personal settings like street, house number, et`);
    });

    bot.command('start', ctx => {
      console.log('start');
      ctx.reply('Start');
    });

    bot.command('cart', handlers.cart);

    bot.command('/add', handlers.add);

    bot.command('reset', handlers.reset);

    bot.command('order', handlers.order);

    bot.command('add_user', handlers.add_user);

    bot.command('user', handlers.user);

    bot.command('settings', handlers.settings);

    bot.on('callback_query', handlers.updateMode);

    bot.startPolling();
  }
}
