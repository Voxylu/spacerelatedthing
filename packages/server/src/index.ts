import express = require('express')
import * as http from 'http'
import { Server } from 'colyseus'
import { SpaceRoom } from './SpaceRoom'

const app = express()

app.use(express.static('../server'))
app.get('/hello', (req, res) => {
  console.log('they want me to say hello')
  res.json({ message: 'hello' })
})

const server = http.createServer()
const gameServer = new Server({
  server,
})

gameServer.register('space', SpaceRoom)

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000
// const host = process.env.ENDPOINT || undefined

gameServer.listen(port)

console.log(`Server started on port ${port}`)

// gameServer.listen(port, host, undefined, () => {
//   console.log(`Server started on http://${host}:${port}`)
// })
