const _ = require('lodash');

module.exports = async (order) => {
  const users = _.map(_.get(order, 'items', []), 'user');

  // console.log('users', users);
  const randomIndex = Math.floor(Math.random() * users.length);
  // console.log(randomIndex);

  return users[randomIndex];
};
