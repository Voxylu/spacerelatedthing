import express = require('express')
import * as http from 'http'
import { Server } from 'colyseus'
import { SpaceRoom } from './SpaceRoom'

const app = express()

app.use(express.static('../server'))

const server = http.createServer()
const gameServer = new Server({
  server,
})

gameServer.register('space', SpaceRoom)

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000
const host = process.env.ENDPOINT || 'localhost'

gameServer.listen(port, host, undefined, () => {
  console.log(`Server started on http://${host}:${port}`)
})
