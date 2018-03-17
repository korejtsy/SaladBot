const _ = require('lodash')
const appName = 'bot'

function getFromEnv(varName, defaultValue = '', prefix = '_BOT') {
  const key = `${_.upperCase(appName)}${_.upperCase(prefix)}_${_.upperCase(varName)}`
  return _.get(process.env, key, defaultValue)
}

const db = {
  'username': getFromEnv('username', 'bot', '_db'),
  'password': getFromEnv('password', 'bot', '_db'),
  'database': getFromEnv('databaset', appName, '_db'),
  'host': getFromEnv('host', '127.0.0.1', '_db'),
  'dialect': 'mysql',
  dialectOptions: {
    charset: 'UTF-8'
  }
}

const bot = {
  token: getFromEnv('token', '', ''),
  username: getFromEnv('username', '', '')
}

module.exports = {
  db,
  bot
}

