const Sequelize = require('sequelize')

module.exports == {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: Sequelize.DATE
}

