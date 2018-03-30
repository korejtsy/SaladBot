const _ = require('lodash');
const Sequelize = require('sequelize');
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
    chatId: chat.id,
    userId: user.id
  };

  const order = await Order
    .findOrCreate({ where: query, defaults: { ...query, chatId: chat.id } }) 
    .spread(order => order.get({ plain: true  })); 

  const fields = {
    ...product,
    date,
    orderId: order.id,
    userId: user.id,
  };

  const itemWhere = _.pick(fields, ['url', 'orderId', 'userId']);
  const itemFields = {
    ...fields,
    userId: user.id,
    count: 1
  };

  return await Item
    .findOrCreate({ where: itemWhere, defaults: itemFields })
    .spread((item, created) => {
      const result = item.get({ plain: true })

      if (!created) {
        result.count++

        const fileds = { count: result.count }
        const where = { id: item.dataValues.id }

        Item.update(fileds, { where })
      }

      return result;
    });
};
