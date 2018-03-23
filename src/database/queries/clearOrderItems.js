const map = require('lodash/map');
const { Op } = require('sequelize');
const { User, Item } = require('../index');
const getOrder = require('./getOrder');

module.exports = async ({ userId, chatId }) => {
  const user = await User
    .findOne({ where: { telegram_account_id: userId } })
    .then(user => user.get({ plain: true }));

  const { items } = await getOrder(chatId);
  Item.destroy({
    where: {
      id: {
        [Op.in]: map(items, 'id'),
      },
      userId: user.id,
    },
  });
};
