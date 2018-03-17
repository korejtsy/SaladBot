const _ = require('lodash')
const moment = require('moment')
const {
  Order,
  Item
} = require('../../model')

module.exports = async (ctx) => {
  console.log('commands', ctx.state.command);
  console.log('commands', ctx.state.args);

  const args = _.get(ctx, 'state.command.args');
  const date = moment().startOf('day')
  const query = {
    date,
    status: 'in_progress'
  }
  const url = _.get(args, '0')

  const order = await Order
    .findOrCreate({ where: query, defaults: query })
    .spread((order) => order.get({ plain: true }))

  const fields = {
    date,
    url,
    orderId: order.id
  }
  const itemWhere = _.pick(fields, ['url', 'orderId'])
  const item = await Item
    .findOrCreate({ where: itemWhere, defaults: fields })
    .spread((item, created) => {
      if (!created) {
        Order.update(fields, { where: { id: item.id } })
      }

      return item.get({ plain: true })
    })

  ctx.reply('Order accepted');
}
