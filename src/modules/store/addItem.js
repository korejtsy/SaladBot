const _ = require('lodash')
const moment = require('moment')
const {
  Order,
  Item
} = require('../../model')

module.exports = async ({ url }) => {
  const date = moment().startOf('day')
  const query = {
    date,
    status: 'in_progress'
  }

  const order = await Order
    .findOrCreate({ where: query, defaults: query })
    .spread((order) => order.get({ plain: true }))

  const fields = {
    date,
    url,
    orderId: order.id
  }
  const itemWhere = _.pick(fields, ['url', 'orderId'])

  return await Item
    .findOrCreate({ where: itemWhere, defaults: fields })
    .spread((item, created) => {
      if (!created) {
        Order.update(fields, { where: { id: item.id } })
      }

      return item.get({ plain: true })
    })
}

