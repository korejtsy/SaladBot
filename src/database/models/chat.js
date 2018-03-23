const Sequelize = require('sequelize');
const defaultFields = require('./defaultFields');

module.exports = connector =>
  connector.define('chat', {
    ...defaultFields,
    telegram_chat_id: Sequelize.INTEGER,
    street: Sequelize.STRING,
    house_number: Sequelize.STRING,
    floor: Sequelize.STRING,
    budget: Sequelize.FLOAT,
  });
