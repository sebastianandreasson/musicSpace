
require('whatwg-fetch')


initScene = require('./scene/index')

fetch('/nodes')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    console.log(body)
  })

initScene()
