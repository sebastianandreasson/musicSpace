require('whatwg-fetch')
const Spotify = require('./spotify/index')
const initScene = require('./scene/index')

const spotify = new Spotify()

function createArtistSystem (artist) {
  console.log('createArtistSystem', artist)

  return spotify.getArtistTopTracks(artist)
  .then(results => {
    console.log(results)
    initScene(results, spotify)
  })
}


// console.log('init spotify')
spotify.init()
.then(() => {
  console.log('spotifyInited')
})
function ready() {
  const searchContainer = document.querySelector('.search')
  const input = document.querySelector('input')
  const button = document.querySelector('button')
  console.log(input)
  console.log(searchContainer)

  input.addEventListener('input', () => {
    console.log('input changed to: ', input.value)
  })
  button.addEventListener('click', () => {
    console.log('search ', input.value)
    searchContainer.removeChild(input)
    searchContainer.removeChild(button)
    createArtistSystem(input.value)
  })
}

document.addEventListener('DOMContentLoaded', ready, false)
