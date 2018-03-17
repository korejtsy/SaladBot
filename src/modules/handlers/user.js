const editUser = require('../store/editUser');
const { User } = require('../../model');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const userID = ctx.update.message.from.id;

  const text = ctx.message.text;
  if (text.startsWith('/')) {
    const match = text.match(/^\/([^\s]+)\s?(.+)?/);

    if (match !== null) {
      if (match[2]) {

        const pairs = match[2].split(',');

        let update = {};
        pairs.forEach( pair => {
          const [ prop, value ] = pair.split(':');

          if (prop && value) {
            update[prop.trim()] = value.trim();
          }
        });

        try {
          await editUser(userID, update)
        } catch(e) {
          console.log(e)
          ctx.reply('Error');
        }
      }
    }
  }
  const user = await User.findOne({ where: { telegram_account_id: userID }});
  if (user) {
  ctx.replyWithMarkdown(`
*name:* ${user.name}
*email:* ${user.email}
*phone:* ${user.phone}
*bonus card number:* ${user.bonus_card_number}
  `);
  } else {
    ctx.reply('No info about user');
  }
}
