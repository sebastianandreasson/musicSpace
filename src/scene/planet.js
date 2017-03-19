

module.exports = (scene, tracks) => {
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

  for (let i = 0; i < tracks.length; i++) {
    const planet = new THREE.Mesh( geometry, materialNormalMap )
    planet.rotation.y = 0

    planet.position.x = Math.random() * 2 - 1
    planet.position.y = Math.random() * 2 - 1
    planet.position.z = Math.random() * 2 - 1
    planet.position.normalize()
    planet.position.multiplyScalar( 10000 )
    planet.song = new Audio(tracks[i].preview_url)
    planets.push(planet)
    scene.add( planet )
  }

  return planets
}
