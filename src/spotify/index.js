const SpotifyWebApi = require('spotify-web-api-node')
const scopes = ['user-read-private', 'user-read-email']
const redirectUri = '/spotiCallback'

const spotify = new SpotifyWebApi({
  clientId : '9fab72d81931467e887b1b4b8c12732f',
  clientSecret : '56ffaa4c427440d89ee96afff745efe2',
  redirectUri : 'https://example.com/callback'
});

function Spotify () {
  this.api = spotify

  this.init = function () {
    return fetch('/spotifyToken')
      .then(response => response.text())
      .then(body => body ? JSON.parse(body) : null)
      .then(json => {
        spotify.setAccessToken(json.access_token)
        return spotify
      })
  }

  this.getNewReleases = () => {
    return spotify
    .getNewReleases({ limit : 50, offset: 0, country: 'SE' })
    .then(data => {
      console.log('spotify.getNewReleases', data)
      return data.body.tracks
    })
  }

  this.getArtistTopTracks = (artist) => {
    return spotify
    .getArtistTopTracks(artist, 'SV')
    .then(data => {
      console.log('spotify.getArtistTopTracks', data)
      return data.body.tracks
    });
  }

  this.getRelatedArtists = (artist) => {
    return spotify
    .getArtistRelatedArtists(artist)
    .then(data => {
      return data.body.artists
    })
  }

  this.play = (track, level) => {
    if (!this.audio) {
      this.audio = new Audio(track.preview_url)
      this.audio.volume = 0.1;
      this.audio.play()
    }
  }
}

module.exports = Spotify
