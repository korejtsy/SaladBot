const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})
bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.startPolling()