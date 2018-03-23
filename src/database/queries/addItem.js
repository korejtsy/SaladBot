const _ = require('lodash');
const moment = require('moment');
const { Order, Item } = require('../index');
const editUser = require('./editUser');
const editSettings = require('./editSettings');

module.exports = async ({ product, userId, chatId }) => {
  const date = moment().startOf('day');
  const user = await editUser(userId, { chatId });
  const chat = await editSettings(chatId);

  const query = {
    date,
    status: 'in_progress',
  };

  const order = await Order
    .findOrCreate({ where: query, defaults: { ...query, chatId: chat.id } })
    .spread(order => order.get({ plain: true }));

  const fields = {
    ...product,
    date,
    orderId: order.id,
  };

  const itemWhere = _.pick(fields, ['url', 'orderId']);
  const itemFields = {
    ...fields,
    userId: user.id,
  };

  return await Item
    .findOrCreate({ where: itemWhere, defaults: itemFields })
    .spread((item, created) => {
      if (!created) {
        Order.update(itemFields, { where: { id: item.id } });
      }

      return item.get({ plain: true });
    });
};
