const Sequelize = require('sequelize')

module.exports = connector =>
  connector.define('item', {
    ...defaultFields,
    date: Sequelize.DATE,
    url: Sequelize.STRING,
    price: Sequelize.FLOAT,
    mods_available: Sequelize.JSON,
    mod: Sequelize.STRING
  })

