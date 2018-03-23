module.exports = (connector) => {
  const models = {
    Chat: require('./chat')(connector),
    User: require('./user')(connector),
    Item: require('./item')(connector),
    Order: require('./order')(connector),
  };

  models.Order.belongsTo(models.Chat);
  models.Order.belongsTo(models.User);
  models.Order.hasMany(models.Item);
  models.Item.belongsTo(models.User);

  return models;
};
