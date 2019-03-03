import express = require('express')
import * as http from 'http'
import { Server } from 'colyseus'
import { SpaceRoom } from './SpaceRoom'
import * as path from 'path'

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/')))
app.get('/hello', (req, res) => {
  console.log('they want me to say hello')
  res.json({ message: 'hello' })
})

const server = http.createServer(app)

const gameServer = new Server({
  server,
})

gameServer.register('space', SpaceRoom)

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000

server.listen(port)
console.log(`Server started on port ${port}`)
