module.exports = {
  bot: {
    token: process.env.BOT_TOKEN || '',
    username: '',
  },
  database: {
    username: '',
    password: '',
    database: 'salad',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'UTF-8',
    },
  },
  log: {
    queries: false,
  },
};
