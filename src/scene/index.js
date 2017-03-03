const THREE = window.THREE = require('three')
require('../controls/FlyControls')

const Scene = require('./scene')
const Controls = require('./controls')
const addStars = require('./stars')
const addPlanets = require('./planet')

let sceneController
let planets = []

function isClose () {
  planets.forEach(function(planet) {
    if (sceneController.camera.position.distanceTo(planet.position) < 300) {
      console.log('closeTo', planet)
    }
  })
}

module.exports = function () {
  sceneController = new Scene()
  sceneController.setup()

  const controls = new Controls(sceneController)

  for (var i = 10; i > 0; i--) {
    addStars(sceneController.scene)
  }


  planets = addPlanets(sceneController.scene, 500)

  distance = sceneController.camera.position.distanceTo(planets[0].position)
  console.log(distance)


  function animate () {
    requestAnimationFrame( animate )
    render()
  }

  function render () {
    var delta = sceneController.clock.getDelta()

    sceneController.renderer.render( sceneController.scene, sceneController.camera )
    sceneController.listeners.forEach(function(listener) {
      listener(delta)
    })

    isClose()
  }

  animate()

}
