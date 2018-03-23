const Sequelize = require('sequelize')
const defaultFields = require('./defaultFields')

module.exports = connector =>
  connector.define('user', {
    ...defaultFields,
    telegram_account_id: Sequelize.STRING,
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: Sequelize.STRING,
    bonus_card_number: Sequelize.STRING
  })

