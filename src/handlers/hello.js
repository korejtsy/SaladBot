const model = require('../model')

module.exports = () => {
  model.sync({ force: true })
}

