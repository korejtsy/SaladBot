const Telegraf = require('telegraf');
const db = require('./database');
const config = require('../config/config');

module.exports = {
  start: () => {
    db.sync({
      force: true,
      alter: true,
    });

    const bot = new Telegraf(config.bot.token, { username: config.bot.username });

    bot.use(require('./middlewares/log'));
    bot.use(require('./middlewares/args'));

    bot.start(require('./commands/start'));

    // List of commands
    bot.command('help', require('./commands/help'));
    bot.command('cart', require('./commands/cart'));
    bot.command('add', require('./commands/add'));
    bot.command('reset', require('./commands/reset'));
    bot.command('order', require('./commands/order'));
    bot.command('user', require('./commands/user'));
    bot.command('settings', require('./commands/settings'));

    bot.on('callback_query', require('./events/callback_query'));

    bot.catch((err) => {
      console.error(err);
    });

    bot.startPolling();
  },
};
