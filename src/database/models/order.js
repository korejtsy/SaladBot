const Sequelize = require('sequelize')
const defaultFields = require('./defaultFields')

module.exports = connector =>
  connector.define('order', {
    ...defaultFields,
    date: Sequelize.DATE,
    status: Sequelize.ENUM(['in_progress', 'ordered']),
  })

