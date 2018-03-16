const Sequelize = require('sequelize')
const defaultFields = require('./defaultFields')

module.exports = connector =>
  connector.define('user', {
    ...defaultFields,
    telegram_account_id: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    bonus_card_number: Sequelize.INTEGER
  })

