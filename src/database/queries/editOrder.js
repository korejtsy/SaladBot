const { Order } = require('../index');

module.exports = async (orderId, fields = {}) => {
  const where = { id: orderId };

  return Order
    .findOrCreate({ where, defaults: fields })
    .spread((order, created) => {
      if (!created) {
        Order.update(fields, { where });
      }

      return order.get({ plain: true });
    });
};
