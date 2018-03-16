const _ = require('lodash')
const Sequelize = require('sequelize')
const {
  db: {
    username,
    password,
    database,
    host,
    dialect
  }
} = require('../config')

const connector = new Sequelize(database, username, password, {
  host,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
connector.query('SET NAMES utf8;')

const definedEntities = require('./entities')(connector)

module.exports = {
  sync: app => connector.sync(),
  ...definedEntities
}

