const _ = require('lodash')
const moment = require('moment')
const {
  Order,
  Item,
  User,
  Chat
} = require('../../model')

module.exports = async chatId => {
  const date = moment().startOf('day')
  const where = {
    date,
    status: 'in_progress'
  }

  return await Order
    .findOne({
      where,
      include: [{
        model: Item,
        include: User
      },{
        model: Chat
      }]
    })
    .then(order => order && order.get({ plain: true }))
}

