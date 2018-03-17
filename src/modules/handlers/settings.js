const editSettings = require('../store/editSettings');

module.exports = async (ctx) => {
  const chatID = ctx.update.message.chat.id;
  const text = ctx.message.text;
  if (text.startsWith('/')) {
    const match = text.match(/^\/([^\s]+)\s?(.+)?/);
    if (match !== null) {
      if (match[2]) {
        const matchProps = match[2].match(/^([^\s]+)\s?(.+)?/);
        if (matchProps !== null) {
          const prop = matchProps[1];
          const value = matchProps[2];

          try {
            await editSettings(chatID, { [prop]: value })
          } catch(e) {
            console.log(e)
            ctx.reply('Error');
          }

          console.log(`Property: ${prop}, Value: ${value}`);
        }
      }
    }
  }
  ctx.reply('Edit account settings');
}

