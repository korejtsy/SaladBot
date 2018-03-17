const editUser = require('../store/editUser');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const userID = ctx.update.message.from.id;

  const text = ctx.message.text;
  if (text.startsWith('/')) {
    const match = text.match(/^\/([^\s]+)\s?(.+)?/);
    let args = [];
    let command;
    if (match !== null) {
      if (match[2]) {
        const matchProps = match[2].match(/^([^\s]+)\s?(.+)?/);

        console.log(matchProps);

        if (matchProps !== null) {
          const prop = matchProps[1];
          const value = matchProps[2];

          try {
            await editUser(userID, { [prop]: value })
          } catch(e) {
            console.log(e)
            ctx.reply('Error');
          }

          console.log(`Property: ${prop}, Value: ${value}`);
        }
      }
    }
  }
  ctx.reply('Edit user in chat');
}
