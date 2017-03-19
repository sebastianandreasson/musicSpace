const THREE = window.THREE = require('three')
require('../controls/FlyControls')

const Scene = require('./scene')
const Controls = require('./controls')
const addStars = require('./stars')
const addPlanets = require('./planet')

let sceneController
let planets = []

const MAX_DISTANCE = 6000

function isClose () {
  planets.forEach(planet => {
    const distance = sceneController.camera.position.distanceTo(planet.position)
    if (distance < MAX_DISTANCE) {
      if (!planet.song.isPlaying) {
        planet.song.play()
        planet.song.isPlaying = true
      }
      planet.song.volume = ( MAX_DISTANCE - distance ) / (MAX_DISTANCE * 2)
    } else if (planet.song.isPlaying){
      planet.song.pause()
      planet.song.isPlaying = false
    }
  })
}

module.exports = (nodes) => {

  console.log(nodes)
  sceneController = new Scene()
  sceneController.setup()
  // spotify = spotifyAPI

  const controls = new Controls(sceneController)

  for (let i = 10; i > 0; i--) {
    addStars(sceneController.scene)
  }


  planets = addPlanets(sceneController.scene, nodes)

  // distance = sceneController.camera.position.distanceTo(planets[0].position)


  function animate () {
    requestAnimationFrame( animate )
    render()
  }

  function render () {
    const delta = sceneController.clock.getDelta()

    sceneController.renderer.render( sceneController.scene, sceneController.camera )
    sceneController.listeners.forEach(function(listener) {
      listener(delta)
    })

    isClose()
  }

  animate()

  return {
    sceneController,
    controls
  }
}
