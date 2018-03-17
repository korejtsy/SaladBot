const _ = require('lodash')
const { Op } = require('sequelize')
const moment = require('moment')
const {
  User,
  Item
} = require('../../model')
const getOrder = require('./getOrder')

module.exports = async ({ userId, chatId }) => {
  const user = await User
    .findOne({ where: { telegram_account_id: userId } })
    .then(user => user.get({ plain: true }))

  const { items } = await getOrder(chatId)
  Item.destroy({
    where: {
      id: {
        [Op.in]: _.map(items, 'id')
      },
      userId: user.id
    }
  })
}

