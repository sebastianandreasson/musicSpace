
const config = require('./config')
const express = require('express')

const app = express()

app.get('/nodes', (req, res) => {
  res.json({
    nodes: [
      {
        hey: 'ho'
      }
    ]
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
