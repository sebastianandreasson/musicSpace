const MARGIN = 0
const radius = 6371
const SCREEN_HEIGHT = window.innerHeight - MARGIN * 2
const SCREEN_WIDTH  = window.innerWidth

function Scene () {
  this.scene = new THREE.Scene()
  this.scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 )
  this.listeners = []

  this.renderer = new THREE.WebGLRenderer({
    antialias: false
  })
  this.renderer.setPixelRatio( window.devicePixelRatio )
	this.renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT )
	this.renderer.sortObjects = false
  document.body.appendChild(this.renderer.domElement)

  this.setup = function () {
    const dirLight = new THREE.DirectionalLight( 0xffffff )
  	dirLight.position.set( -1, 0, 1 ).normalize()

    this.scene.add(dirLight)

    this.camera = new THREE.PerspectiveCamera( 25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7 )
    this.camera.position.z = radius * 5
    this.camera.lookAt(new THREE.Vector3(0.5860185623168945, 0.5938381172414715, 0.5513062081376774))
    window.camera = this.camera

    this.clock = new THREE.Clock()
  }

  this.addRenderListener = function(listener) {
    this.listeners.push(listener)
  }
}

module.exports = Scene
