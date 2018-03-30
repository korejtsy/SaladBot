const { map, filter } = require('lodash');
const { Op } = require('sequelize');
const { User, Item } = require('../index');
const getOrder = require('./getOrder');

module.exports = async ({ userId, chatId, id = 0 }) => {
  const user = await User
    .findOne({ where: { telegram_account_id: userId } })
    .then(user => user.get({ plain: true }));

  if (id) {
    const where = { id, userId: user.id }

    return await Item
      .findOne({ where })
      .then(model => {
        if (!model) return null
        const { count, product_name } = model.get({ plain: true })

        if (+count > 1) {
          Item.update({ count: +count - 1 }, { where })
        } else {
          Item.destroy({ where })
        }

        return { product_name }
      })
  }

  const { items } = await getOrder(chatId);

  return Item.destroy({
    where: {
      id: { [Op.in]: map(items, 'id') },
      count: { [Op.lt]: 2 },
      userId: user.id
    }
  });
};
