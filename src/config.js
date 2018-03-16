const _ = require('lodash')
const appName = 'bot'

function getFromEnv(varName, defaultValue = '', prefix = 'ROOT') {
  return _.get(process.env, `${_.upperCase(appName)}_${_.upperCase(prefix)}_${_.upperCase(varName)}`, defaultValue)
}

const db = {
  'username': getFromEnv('username', 'root', 'db'),
  'password': getFromEnv('password', null, 'db'),
  'database': getFromEnv('databaset', appName, 'db'),
  'host': getFromEnv('host', '127.0.0.1', 'db'),
  'dialect': 'mysql',
  dialectOptions: {
    charset: 'UTF-8'
  }
}

module.exports = {
  db
}

