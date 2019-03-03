import { Server } from 'colyseus'
import { createServer } from 'http'
import { SpaceRoom } from './SpaceRoom'

const app = new Server({
  server: createServer(),
})

app.register('space', SpaceRoom)

app.listen(4000, '192.168.1.30', undefined, () => {
  console.log(`Server started`)
})
