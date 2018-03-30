const Sequelize = require('sequelize');
const defaultFields = require('./defaultFields');

module.exports = connector =>
  connector.define('item', {
    ...defaultFields,
    date: Sequelize.DATE,
    product_name: Sequelize.STRING,
    url: Sequelize.STRING,
    price: Sequelize.FLOAT,
    mods_available: Sequelize.JSON,
    mod: Sequelize.STRING,
    count: Sequelize.INTEGER
  });
