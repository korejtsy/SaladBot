const moment = require('moment');
const { Order, Item, User, Chat } = require('../index');

module.exports = async (chatId, { status = 'in_progress' } = {}) => {
  const date = moment().startOf('day');
  const where = {
    date,
    status,
  };

  return await Order
    .findOne({
      where,
      include: [{
        model: Item,
        include: User,
      }, {
        model: Chat,
      }],
    })
    .then(order => order && order.get({ plain: true }));
};
