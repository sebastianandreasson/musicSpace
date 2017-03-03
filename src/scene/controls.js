
function Controls (sceneController) {
  const self = this
  this.controls = new THREE.FlyControls( sceneController.camera )

  self.controls.movementSpeed = 5000
	this.controls.domElement = document.body
	this.controls.rollSpeed = Math.PI / 24
	this.controls.autoForward = false
	this.controls.dragToLook = false

  this.d = new THREE.Vector3()

  this.update = function (delta) {
    self.controls.update( delta )
  }

  sceneController.listeners.push(this.update)

}

module.exports = Controls
