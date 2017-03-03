

module.exports = function (scene, amount) {
  const planets = []
  const r = 50
  // const materialNormalMap = new THREE.MeshPhongMaterial( {
  // 	specular: 0x333333,
  // 	shininess: 15
  // })
  const materialNormalMap = new THREE.PointsMaterial({
    size: 50
  })
  const geometry = new THREE.SphereGeometry( r, 100, 50 )

  for (var i = 0; i < amount; i++) {
    const planet = new THREE.Mesh( geometry, materialNormalMap )
    planet.rotation.y = 0

    planet.position.x = Math.random() * 2 - 1;
    planet.position.y = Math.random() * 2 - 1;
    planet.position.z = Math.random() * 2 - 1;
    planet.position.normalize();
    planet.position.multiplyScalar( 10000 );
    planets.push(planet)
    scene.add( planet )
  }

  return planets
}
