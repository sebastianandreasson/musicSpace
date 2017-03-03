const config = require('nconf')
.env({
  separator: '__',
  lowerCase: true
})
.file({
  file: 'config.json',
  dir: './',
  search: true
})
.defaults({
})

module.exports = {
  NODE_ENV: config.get('NODE_ENV'),
  PORT: config.get('PORT')
}
