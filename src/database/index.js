const Sequelize = require('sequelize');
const { database, log } = require('../../config/config');

const connector = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: database.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: log.queries,
});

connector.query('SET NAMES utf8;');

const definedEntities = require('./models')(connector);

module.exports = {
  sync: options => connector.sync(options),
  ...definedEntities,
};
