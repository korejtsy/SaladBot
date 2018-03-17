const _ = require('lodash')
const moment = require('moment')
const { User } = require('../../model')

module.exports = async (order) => {
  const users = _.map(_.get(order, 'items', []), 'user');

  // console.log('users', users);
  const randomIndex = Math.floor(Math.random() * users.length);
  // console.log(randomIndex);

  return users[randomIndex];
}
