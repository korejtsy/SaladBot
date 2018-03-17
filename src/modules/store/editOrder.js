const _ = require('lodash')
const moment = require('moment')
const { Order } = require('../../model')

module.exports = async (orderId, fields = {}) => {
  const where = { id: orderId }

  return Order
    .findOrCreate({ where, defaults: fields })
    .spread((order, created) => {
      if (!created) {
        Order.update(fields, { where })
      }

      return order.get({ plain: true })
    })
}

