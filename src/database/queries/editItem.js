const { Item } = require('../index');

module.exports = async (itemId, fields = {}) => {
  const where = { id: itemId };

  return Item
    .findOrCreate({ where, defaults: fields })
    .spread((item, created) => {
      if (!created) {
        Item.update(fields, { where });
      }

      return item.get({ plain: true });
    });
};
