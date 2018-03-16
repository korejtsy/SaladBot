module.exports = connector => ({
  User: require('./user')(connector)
})

