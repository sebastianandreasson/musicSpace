
const config = require('./config')
const express = require('express')

const app = express()

const SpotifyWebApi = require('spotify-web-api-node')
const scopes = ['user-read-private', 'user-read-email']
const redirectUri = '/spotiCallback'

const spotify = new SpotifyWebApi({
  clientId : '9fab72d81931467e887b1b4b8c12732f',
  clientSecret : '56ffaa4c427440d89ee96afff745efe2',
  redirectUri : 'https://example.com/callback'
});

app.get('/spotifyToken', (req, res) => {
  spotify.clientCredentialsGrant()
  .then(data => {
    res.json({
      access_token: data.body['access_token']
    })
  })
  .then(() => start())
})

app.get('/nodes', (req, res) => {
  res.json({
    nodes: [
      {
        hey: 'ho'
      }
    ]
  })
})

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'))
// })

app.listen(3000, () => console.log(`Listening on port ${3000}`))
