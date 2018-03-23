const { Chat } = require('../index');

module.exports = async (chatId, fields = {}) => {
  const where = { telegram_chat_id: chatId };

  return Chat
    .findOrCreate({ where, defaults: fields })
    .spread((chat, created) => {
      if (!created) {
        Chat.update(fields, { where });
      }

      return chat.get({ plain: true });
    });
};
