const Force = require('./force')

const exports = function(){
  const Mover = function() {
    this.size = 0
    this.time = 0
    this.is_active = false
    Force.call(this)
  }
  Mover.prototype = Object.create(Force3.prototype)
  Mover.prototype.constructor = Mover
  Mover.prototype.init = function(vector) {
    this.velocity = vector.clone()
    this.anchor = vector.clone()
    this.acceleration.set(0, 0, 0)
    this.time = 0
  }
  Mover.prototype.activate = function() {
    this.is_active = true
  }
  Mover.prototype.inactivate = function() {
    this.is_active = false
  }
  return Mover
}

module.exports = exports()
