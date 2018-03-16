const Sequelize = require('sequelize')

module.exports = connector =>
  connector.define('order', {
    ...defaultFields,
    date: Sequelize.DATE,
    status: Sequelize.ENUM(['in_progress', 'ordered']),
  })

