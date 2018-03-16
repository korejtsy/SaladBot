module.exports = connector => {
  const models = {
    Chat: require('./chat')(connector),
    User: require('./user')(connector),
    Item: require('./item')(connector),
    Order: require('./order')(connector),
  }

  models.User.belongsTo(models.Chat)
  models.Order.hasMany(models.Item)

  return models
}

