const _ = require('lodash')
const moment = require('moment')
const { User } = require('../../model')

module.exports = async (userId, fields = {}) => {
  const users = await User
    .findAll({ defaults: fields })
    .then(users => users.map(user => user.get({ plain: true })));

  // console.log('users', users);
  const randomIndex = Math.floor(Math.random() * users.length);
  // console.log(randomIndex);

  return users[randomIndex];
}

